import React ,{useState ,useEffect} from 'react'

import MainCard from 'components/MainCard'
import OrderTable from 'pages/dashboard/OrdersTable'
import { Button, Hidden, Input, InputLabel ,Modal,OutlinedInput  } from '@mui/material';
import { SearchOutlined ,ArrowLeftOutlined, CloseCircleTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
// import { HOST } from 'config';
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
      id: 'size',
      align: 'left',
      disablePadding: false,
      label: 'Size'
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
    const [files ,setFiles] = useState([])
    const [viewFiles ,setViewFiles] = useState([])
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')
    const [search ,setSearch] = useState('')
    const [modal ,setModal] = useState(false)

// Getting the products 
    useEffect(()=>{
        async function getProducts(){
            // console.log(`http://localhost:8080/product/get-product`)
            setLoading(true)
            try{
                const response = await fetch(`http://localhost:8080/product/get-products`)
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setProducts(data)
                }
            }
            catch(e){
                console.log(e)
                setError("Internet error")
            }finally{
                setLoading(false)
            }
        }
        getProducts()
    },[0])

console.log(products)
// Product Deletion
async function deleteProduct(id){
    try{
        const response = await fetch(`http://localhost:8080/product/delete-product/${id}`,{
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
        const response = await fetch(`http://localhost:8080/product/create-product` ,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(info)
        })
        if(response.ok){
            const data = await response.json()
            console.log(data)

            if(data.product_id){
                if(files.length != 0 ){
                    const formData = new FormData()
                    for(let i=0;i<files.length;i++){
                        formData.append("image" ,files[i])
                    }                    
                    await fetch(`http://localhost:8080/product/upload-product-image/${data.product_id}` ,{
                        method:'post',
                        body:formData
                    })
                    .then(res => res.json())
                    .then(result => {
                        setMsg('Product saved correctly')
                        console.log(result)
                    })
                    .catch(e => console.log(e))
                }
            }


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


function handleFiles(e){
    console.log(e.target.files)
    setFiles(e.target.files)

    for(let i=0;i<e.target.files.length;i++){
    const reader = new FileReader()
        reader.onload =()=>{
            setViewFiles(prev => [...prev ,reader.result])
        }
        reader.readAsDataURL(e.target.files[i])
    }
}


function removeFile(index){
    
    setViewFiles(prev => {
        return prev.filter((viewFile ,i) => i != index)
    })
    let temp = []
    for(let i=0;i<files.length;i++){
        if(i != index){
            temp.push(files[i])
        }
    }
    setFiles(temp)
}
// console.log(modal)

if(!createActive){
    return(
        <React.Fragment>
            <MainCard title="Product Management">
            {
                    modal &&
                <Modal
                    open={modal}
                    onClose={()=>{}}
                >
                    <div  className='product-modal'>
                        <div className='product-modal-head'>
                            <span>{modal.name}</span>
                            <span style={{cursor:'pointer'}} onClick={()=>setModal(false)} > <CloseCircleTwoTone/> </span>
                        </div>
                        <div className='product-modal-body'>
                            <div style={{display:'flex' ,gap:'10px' ,overflowY:'hidden' ,overflowX:'auto'}}>
                                {
                                    modal.image.split("*").map((img ,index) => {
                                        return <img src={`http://localhost:8080/${img}`} style={{width:'125px' ,height:'125px' ,border:'solid 1px grey' ,borderRadius:'5px'}} />
                                    })
                                }
                            </div><br/>

                            <div>
                                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                                    <span>Price</span>
                                    <input value={modal.price+" XAF"} disabled />
                                </div>

                                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                                    <span>Colour</span>
                                    <input value={modal.colour} disabled />
                                </div>

                                <div style={{display:'flex' ,justifyContent:'space-between'}}>
                                    <span>Size</span>
                                    <input value={modal.size} disabled />
                                </div>

                            </div>

                        </div>
                    </div>
    
                </Modal>
            }

                <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>List of Products ({products.length}) </h3>
                    <div>
                    <Input type="text" placeholder='Search for an item' onChange={e=>setSearch(e.target.value)} />
                        <SearchOutlined/>
                    </div>
                    <Button onClick={()=>setCreateActive(true)}>Create product</Button>
                </div>

                <br/>
                {
                    !loading ?
                    <OrderTable headCells={headCells} rows={products} deleteProduct={deleteProduct} setModal={setModal} />:
                    <div style={{display:'flex' ,justifyContent:'center' ,padding:'30px'}} >Loading ...</div>
                }

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
                        <OutlinedInput className='input' type="text" required  onChange={e=>{console.log(e.target.value);setInfo({...info ,name:e.target.value})}} />
                    </div>

                    <div className='form-group'>
                        <InputLabel> Price</InputLabel>
                        <OutlinedInput className='input' type="number" required onChange={e=>setInfo({...info ,price:e.target.value})} />
                    </div>

                    <div className='form-group'>
                        <InputLabel>Colour</InputLabel>
                        <OutlinedInput className='input' type="text" required onChange={e=>setInfo({...info ,colour:e.target.value})} />
                    </div>

                    <div className='form-group'>
                        <InputLabel>Size</InputLabel>
                        <OutlinedInput className='input' type="text" required onChange={e=>setInfo({...info ,size:e.target.value})} />
                    </div>

                    <div style={{cursor:'pointer'}}>
                    <InputLabel htmlFor="file" style={{padding:'20px 0px' ,cursor:'pointer'}}>Select images <PlusSquareTwoTone/> </InputLabel>
                    <input  id="file" className='input' type="file" multiple required onChange={e=>handleFiles(e)}  style={{display:'none'}}  />
                    </div>

                    {/* Images section */}
                    <div style={{display:'flex' ,gap:'10px'}}>
                        {viewFiles && viewFiles.length != 0 && viewFiles.map((file ,index) => {
                          return(
                            <div style={{display:'flex' ,flexDirection:'column'}}>
                                <div key={index}>
                                    <img src={file} style={{width:'100px' ,height:'100px' ,borderRadius:'5px'}} />
                                </div>
                                <span onClick={()=>removeFile(index)} 
                                style={{ cursor:'pointer',textAlign:'center',border:'solid 1px grey' ,color:'red',borderRadius:'2pxs'}}>Remove</span>
                            </div>
                          )         
                        })}
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
