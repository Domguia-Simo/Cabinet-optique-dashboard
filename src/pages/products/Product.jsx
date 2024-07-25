import React ,{useState ,useEffect} from 'react'

import MainCard from 'components/MainCard'
import OrderTable from 'pages/dashboard/OrdersTable'
import { Button, Input, InputLabel ,Modal,OutlinedInput  } from '@mui/material';
import { SearchOutlined ,ArrowLeftOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import { HOST_NAME } from 'config';
import './product-styles.css'
import loader from '../../assets/images/loading.gif' 

const headCells = [
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: 'Product_id'
    },
    {
      id: 'name',
      align: 'left',
      disablePadding: true,
      label: 'Product Name'
    },
    {
      id: 'price',
      align: 'left',
      disablePadding: false,
      label: 'Price (XAF)'
    },
    {
      id: 'quantity',
      align: 'left',
      disablePadding: false,
      label: 'Quantity'
    },
    {
      id: 'colour',
      align: 'left',
      disablePadding: false,
      label: 'Colour'
    },
    {
        id:'action',
        align:'left',
        disablePadding:false,
        label:'Action'
    }
  ];
  

const ManageProducts = () => {

    const [createActive ,setCreateActive] = useState(false)
    const [products ,setProducts] = useState([])
    const [info ,setInfo] = useState({
        name:'',
        colour:'',
        size:'',
        type:'',
        price:''
    })
    const [files ,setFiles] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')
    const [search ,setSearch] = useState('')
    const [modal ,setModal] = useState(false)

// Getting the products 
    useEffect(()=>{
        async function getProducts(){
            // console.log(`${HOST_NAME}/product/get-product`)
            try{
                const response = await fetch(`${HOST_NAME}/product/get-products`)
                if(response.ok){
                    const data = await response.json()
                    // console.log(data)
                    setProducts(data)
                }
            }
            catch(e){
                console.log(e)
                setError("Internet error")
            }
        }
        getProducts()
    },[0])


// Product Deletion
async function deleteProduct(id){
    try{
        const response = await fetch(`${HOST_NAME}/product/delete-product/${id}`,{
            method:'delete',
        })
        if(response.ok){
            // console.log(response)
            setProducts(prev => {
                let temp = prev.filter(p => p.id != id )
                return temp
            })
        }
    }
    catch(e){
        console.log(e)
    }
}


// Save the product
async function submitForm(){
    // console.log(info)
    // return
    setError('')
    setMsg('')
    let {name ,price ,colour ,size } = info
    if(!name ,!price ,!colour ,!size){
        setError("Please fill the entire form")
        return
    }
    try{
        setLoading(true)
        const response = await fetch(`${HOST_NAME}/product/create-product` ,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(info)
        })
        if(response.ok){
            const data = response.json()
            console.log(data)
            setMsg('Product saved correctly')

        }else{
            setError("Error saving")
        }
    }
    catch(e){
        console.log(e)
        setError("Verify your connection")
    }
    finally{
        setLoading(false)
    }
}

if(!createActive){
    return(
        <React.Fragment>
            <MainCard title="Product Management">

            <Modal
                open={modal}
                onClose={()=>{}}
            >
                <div  className='product-modal'>
                    <div className='product-modal-head'>
                        <span>Product name</span>
                        <span style={{cursor:'pointer'}} onClick={()=>setModal(false)} > <CloseCircleTwoTone/> </span>
                    </div>
                    <div className='product-modal-body'>
                        The modal
                    </div>
                </div>
   
            </Modal>

                <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>List of Products ({products.length}) </h3>
                    <div>
                    <Input type="text" placeholder='Search for an item' onChange={e=>setSearch(e.target.value)} />
                        <SearchOutlined/>
                    </div>
                    <Button onClick={()=>setCreateActive(true)}>Create product</Button>
                </div>

                <br/>

                <OrderTable headCells={headCells} rows={products} deleteProduct={deleteProduct} setModal={setModal} />

            </MainCard>

        </React.Fragment>

    )

}else{
    return(
        <React.Fragment>
            <MainCard title="Create a product">

                <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>Product Creation Form</h3>
                    <Button onClick={()=>setCreateActive(false)}> <ArrowLeftOutlined/> &nbsp;  View Product(s)</Button>
                </div>

                <br/>

                <div
                style={{border:'solid 0px grey' ,margin:'auto' ,display:'flex' ,flexDirection:'column' ,rowGap:'10px' ,alignItems:'center'}}>
                    <div className='form-group'>
                        <InputLabel>Product name</InputLabel>
                        <OutlinedInput className='input' type="text"  onChange={e=>{console.log(e.target.value);setInfo({...info ,name:e.target.value})}} />
                    </div>

                    <div className='form-group'>
                        <InputLabel> Price</InputLabel>
                        <OutlinedInput className='input' type="number" onChange={e=>setInfo({...info ,price:e.target.value})} />
                    </div>

                    <div className='form-group'>
                        <InputLabel>Colour</InputLabel>
                        <OutlinedInput className='input' type="text" onChange={e=>setInfo({...info ,colour:e.target.value})} />
                    </div>

                    <div className='form-group'>
                        <InputLabel>Size</InputLabel>
                        <OutlinedInput className='input' type="text" onChange={e=>setInfo({...info ,size:e.target.value})} />
                    </div>

                    <div style={{cursor:'pointer'}}>
                    <InputLabel htmlFor="file">Select images</InputLabel>
                    <OutlinedInput  id="file" className='input' type="file" style={{display:'none'}}  />
                    </div>

                    <span style={{color:'crimson'}}>{error && error}</span>
                    <span style={{color:'darkgreen'}}>{msg && msg}</span>

                    <div style={{ display:'flex',gap:'30px'}}>
                        <Button onClick={()=>setInfo({name:'' ,price:'' ,colour:'' ,type:''})}>Reset</Button>
                        <Button onClick={(e)=>submitForm()}>Submit {loading && <img src={loader} />} </Button>

                    </div>

                </div>

            </MainCard>

        </React.Fragment>

    )
}
}


export default ManageProducts
