import MainCard from 'components/MainCard'
import React ,{useState ,useEffect} from 'react'


const Analytics = () => {
    
    const [userAnalyses ,setUserAnalyses] = useState()
    const [productAnalyses ,setProductAnalyses] = useState([])
    const [loadCounter ,setLoadCounter] = useState(0)
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [msg ,setMsg] = useState('')
    
    async function getUserAnalyses(){
        try{
            const order_product = await fetch('http://localhost:8080/analytics/active-user')
            if(order_product.ok){
                const data1 = await order_product.json()
                setUserAnalyses(data1)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoadCounter((prev)=>++prev)
            setLoading(prev=>loadCounter == 2 ? false:true)
        }
    
    }

    async function getProductAnalyses(){
        try{
            const active_product = await fetch('http://localhost:8080/analytics/order-product')
            if(active_product.ok){
                const data1 = await active_product.json()
                setProductAnalyses(data1)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoadCounter(prev=>++prev)
            setLoading(prev=>loadCounter == 2 ? false:true)
        }
    
    }

    useEffect(()=>{
        getUserAnalyses()
        getProductAnalyses()
    },[0])

    console.log("user analyses :" ,userAnalyses)
    console.log("product analyses : " ,productAnalyses)


    return(
        <React.Fragment>

            <MainCard title="System Analytic Data">
                <div style={{display:'flex' ,border:'solid 0px red' ,justifyContent:'space-around'}}>
                    <h3>Daily Report From Analytic Data</h3>
                </div>

                { userAnalyses &&  <ActiveUser users={userAnalyses} />}
                { productAnalyses && productAnalyses.length && productAnalyses.map((pa ,index) => <OrderProduct key={index} product={pa} />)}

            </MainCard>

        </React.Fragment>
    )
}


export default Analytics


const ActiveUser =({user})=>{

        const [consultation ,setConsultation] = useState(user.consultation)
        const [order ,setOrder] = useState(user.order)

    return(<>
    
        <div>
            <div>
                <h3>Most Active users based on Consultations</h3>

                <div>
                    {consultation.map((item ,index) => {
                        return (<div key={index}>
                            <span>Name: {item.name}</span>
                            <span>Email: {item.email}</span>
                            <span>Phone_Number: {item.phoneNumber}</span>
                        </div>)
                    })}
                </div>
            </div>

            <div>
                <h3>Most Active users based on Orders</h3>

                <div>
                    {order.map((item ,index) => {
                        return (<div key={index}>
                            <span>Name: {item.name}</span>
                            <span>Email: {item.email}</span>
                            <span>Phone_Number: {item.phoneNumber}</span>
                        </div>)
                    })}
                </div>
            </div>

        </div>

    </>)
}


const OrderProduct =({product})=>{
    return(<>
        <div>
            <h3>Most Ordered Prodcuts</h3>
            <div>
                <span> Name: {product.name}</span>
                <span>Price: {product.price}</span>
                <span>Colour: {product.colour}</span>
                <span></span>
            </div>
        </div>   
    </>)
}