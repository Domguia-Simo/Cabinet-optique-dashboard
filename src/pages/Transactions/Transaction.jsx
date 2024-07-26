import React,{useState} from 'react'
import MainCard from 'components/MainCard'
import { SearchOutlined } from '@ant-design/icons'
import { Table ,TableBody ,TableRow ,TableCell ,Input ,TableHead } from '@mui/material'

const Transaction = () => {
    
    const [transactions ,setTransactions] = useState([])
    const [modal ,setModal] = useState(false)
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')


    return(
        <React.Fragment>
            <MainCard title="List of Transactions">
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
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        {/* <TableCell>Status</TableCell> */}
                        <TableCell>Status</TableCell>

                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transaction => <TransactionRecord key={transaction.id} transaction={transaction} deleteTransaction={()=>{}} />)}
                </TableBody>
            </Table>

            </MainCard>

        </React.Fragment>
    )
}

export default Transaction

const TransactionRecord = React.memo(({transaction ,deleteTransaction})=>{

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
            <TableCell style={{display:'flex' ,justifyContent:'space-evenly' ,cursor:'pointer'}}>
                <EyeOutlined/>
                <DeleteOutlined onClick={()=>deleteTransaction(transaction.id)} /> 
            </TableCell>

        </TableRow>
    )
})