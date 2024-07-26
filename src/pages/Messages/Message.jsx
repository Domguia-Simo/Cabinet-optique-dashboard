import React,{useState} from 'react'
import MainCard from 'components/MainCard'
import { SearchOutlined } from '@ant-design/icons'
import { Table ,TableBody ,TableRow ,TableCell ,Input ,TableHead } from '@mui/material'

const Messages = () => {
    
    const [messages ,setMessages] = useState([])
    const [modal ,setModal] = useState(false)
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')


    return(
        <React.Fragment>
            <MainCard title="List of messages">
            <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>List of messages</h3>
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
                        <TableCell>Message</TableCell>

                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages.map(message => <MessageRecord key={message.id} message={message} deleteMessages={()=>{}} />)}
                </TableBody>
            </Table>

            </MainCard>

        </React.Fragment>
    )
}

export default Messages

const MessageRecord = React.memo(({message ,deleteMessages})=>{

    let colorStatus;
    switch(message.status){
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
            <TableCell>{message.id}</TableCell>
            <TableCell>{message.date}</TableCell>
            <TableCell style={{color:colorStatus}} >{message.status}</TableCell>
            <TableCell style={{display:'flex' ,justifyContent:'space-evenly' ,cursor:'pointer'}}>
                <EyeOutlined/>
                <DeleteOutlined onClick={()=>deleteMessages(message.id)} /> 
            </TableCell>

        </TableRow>
    )
})