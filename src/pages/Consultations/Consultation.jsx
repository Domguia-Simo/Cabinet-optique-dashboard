import React ,{useState ,useEffect} from 'react'

import MainCard from 'components/MainCard'
import OrderTable from 'pages/dashboard/OrdersTable'
import { HOST_NAME } from 'config'
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Table, TableBody, TableCell, TableHead, TableRow, responsiveFontSizes } from '@mui/material'

const Consultation = () => {

    const [consultations ,setConsultations] = useState([])
    const [modal ,setModal] = useState(false)
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')
    // const []

    // to fetch for the consultation list
    useEffect(()=>{
        async function getConsultation(){
            try{
                const response =await fetch(`${HOST_NAME}/consultation/get-consultation`)
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setConsultations(data)
                }
            }
            catch(e){
                console.log(e)
                setError("")
            }
        }
        getConsultation()
    },[0])


    async function deleteConsultation(id){
        try{
            const response = await fetch(`${HOST_NAME}/consultation/delete-consultation/${id}` ,{method:'delete'})
            if(response.ok){
                setConsultations(prev => {
                    let temp = prev.filter(con => con.id != id)
                    return temp
                })
            }
        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <React.Fragment>
            <MainCard title="List of consultations">
            <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>List of consultations</h3>
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
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {consultations.map(consultation => <ConsultationRecord key={consultation.id} consultation={consultation} deleteConsultation={deleteConsultation} />)}
                </TableBody>
            </Table>

            </MainCard>

        </React.Fragment>

    )
}


export default Consultation

const ConsultationRecord = React.memo(({consultation ,deleteConsultation})=>{

    let colorStatus;
    switch(consultation.status){
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
            <TableCell>{consultation.id}</TableCell>
            <TableCell>{consultation.date}</TableCell>
            <TableCell style={{color:colorStatus}} >{consultation.status}</TableCell>
            <TableCell style={{display:'flex' ,justifyContent:'space-evenly' ,cursor:'pointer'}}>
                <EyeOutlined/>
                <DeleteOutlined onClick={()=>deleteConsultation(consultation.id)} /> 
            </TableCell>

        </TableRow>
    )
})