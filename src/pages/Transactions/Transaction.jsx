import React,{useState ,useEffect} from 'react'
import MainCard from 'components/MainCard'
import { CloseCircleTwoTone, DeleteOutlined, EyeOutlined, SearchOutlined, SendOutlined } from '@ant-design/icons'
import { Table ,TableBody ,TableRow ,TableCell ,Input ,TableHead, Modal, OutlinedInput  } from '@mui/material'

import './transaction-styles.css'

const Transaction = () => {
    
    const [transactions ,setTransactions] = useState([])
    const [details ,setDetails] = useState([])
    const [modal ,setModal] = useState(false)
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')

    const [loadingMore ,setLoadingMore] = useState(false)

    // Getting the list of orders made
    useEffect(()=>{
        async function getOrders(){
            try{
                const response = await fetch(`http://localhost:8080/order/get-order`)
                const data = await response.json()
                let temp = data.map(res => {
                    return {...res ,status:'pending'}
                })
                setTransactions(temp)
            }   
            catch(e){
                console.log(e)
            }
        }
        getOrders()
    },[0])


    // Getting more information about a particular order
    useEffect(()=>{
        async function getMoreInfo(){
            setLoadingMore(true)
            try{
                const res = await fetch(`http://localhost:8080/order/get-order-details/${modal}`)
                const data = await res.json()
                console.log(data)
                setDetails(data)
            }
            catch(e){
                console.log(e)
            }finally{
                setLoadingMore(false)
            }

        }
        if(modal)
            getMoreInfo()

    },[modal])
let total=0
    return(
        <React.Fragment>
            <MainCard title="List of Transactions">

                {modal && 
                
                <Modal open={modal} onClose={()=>{}} >
                    <div className='transaction-modal'>
                    <div className='transaction-modal-head'>
                            <span>{'Transaction detail'}</span>
                            <span style={{cursor:'pointer'}} onClick={()=>setModal(false)} > <CloseCircleTwoTone/> </span>
                    </div>
                    {
                        !loadingMore ?
                        <div className='transaction-modal-body'>
                            <div>
                                <h2>Product(s) : {details.length}</h2>
                                <div className='detail-item-container'>
                                    {
                                        details && details.length != 0 && details.map(d => {
                                                total = total + d.quantity * d.price
                                            return (
                                                <div key={d.id} className='detail-item'>
                                                    <img src={`http://localhost:8080/${d.product.image.split("*")[0]}`} 
                                                    style={{width:'100%' ,height:'75px' ,objectFit:'contain'}} />
                                                    <span>name : {d.product.name}</span>
                                                    <span>price : {d.price}</span>
                                                    <span>quantity : {d.quantity}</span>
                                                    <span style={{borderTop:'solid 1px grey'}}>Total :<b> {d.quantity * d.price} XAF </b></span>
                                                </div>   
                                            )
                                        })
                                    }

                                </div>

                                <h2>Order Info</h2>
                                <div className='order-info'>
                                    <span>Total price : {total} XAF</span>
                                    <span>Amount paid : {0} XAF</span>
                                    <span>Payment status : {'pending'}</span> 
                                </div>

                                <h2>Message the client</h2>
                                <div>
                                    <OutlinedInput value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder='Enter a message ....' />
                                    &nbsp;<SendOutlined style={{cursor:'pointer' ,fontSize:'x-large'}}/>
                                </div>

                            </div>

                        </div>
                        :
                        <div>Loading ...</div>
                    }

                    </div>
                </Modal>    

                }

            <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>List of transactions</h3>
                    <div>
                    <Input type="text" placeholder='Search for an item' onChange={e=>setSearch(e.target.value)} />
                        <SearchOutlined/>
                    </div>
            </div>

            {/* The consultaiton table */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Client Name</TableCell>
                        <TableCell>Client Contact</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transaction => <TransactionRecord key={transaction.id} setModal={setModal} transaction={transaction} deleteTransaction={()=>{}} />)}
                </TableBody>
            </Table>

            </MainCard>

        </React.Fragment>
    )
}

export default Transaction

const TransactionRecord = React.memo(({transaction ,deleteTransaction ,setModal})=>{

    let colorStatus;
    switch(transaction.status){
        case 'pending':
            colorStatus = "orange"
        break;
        case 'failed':
            colorStatus = "red"
        break;
        case 'success':
            colorStatus = "darkgreen"
        break;
    }

    return(
        <TableRow>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell style={{color:colorStatus}} >{transaction.status}</TableCell>
            <TableCell>{transaction.user.name}</TableCell>
            <TableCell>{transaction.user.phoneNumber ? transaction.user.phoneNumber : transaction.user.email }</TableCell>
            <TableCell style={{display:'flex' ,justifyContent:'space-evenly' ,cursor:'pointer'}}>
                <EyeOutlined onClick={()=>setModal(transaction.id)} />
                <DeleteOutlined onClick={()=>deleteTransaction(transaction.id)} /> 
            </TableCell>

        </TableRow>
    )
})