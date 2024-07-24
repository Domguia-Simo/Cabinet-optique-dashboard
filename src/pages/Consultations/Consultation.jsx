import React ,{useState ,useEffect} from 'react'

import MainCard from 'components/MainCard'
import OrderTable from 'pages/dashboard/OrdersTable'

const Consultation = () => {

    const [consultations ,setConsultations] = useState([])

    return(
        <React.Fragment>
            <MainCard title="List of consultations">
                

            </MainCard>

        </React.Fragment>

    )
}


export default Consultation