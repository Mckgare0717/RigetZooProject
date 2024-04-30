import "./BookingForm.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form,Input,Button,DatePicker,InputNumber,Radio,message,Modal } from "antd"
import moment from 'moment';
import axios from "axios";



const BookingForm=()=>{

    const [phno,setphno] = useState("")
    const [address,setAddress] = useState("")
    const [numTickets,setnNumTickets] = useState(0)
    const [date,setDate] = useState(null)
    const totalPrice = numTickets*25 //here the price of tickets are being calculated.
    const [messageApi, contextHolder] = message.useMessage();
    
    const navigate = useNavigate()
    const [booking,setBooking] = useState([])
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [user,setUser] = useState([])

    //This function is going to send data to book a ticket for the zoo
    const bookTicket=()=>{
        const aToken = localStorage.getItem("token")
        const dataTosend = {
            access_token:aToken,
            phno:phno,
            address:address,
            numTickets:numTickets,
            date:String(date),
            totalPrice:totalPrice
        }
        //connects the backend to the frontend
        axios.post("http://localhost:8000/users/zootickets",dataTosend).then((res) => {
        console.log(res.data)
        setBooking(res.data)
        messageApi.open({type:"success",content:"your ticket has been booked successfully",duration:10})
        messageApi.open({type:"success",content:"You have received 10 points",duration:10})
        setIsModalOpen(true)
        
        }).catch((err) => {
            const errorMessage = err.response.data.detail
            messageApi.open({type:"error",content:errorMessage,duration:10})
        });

        
    }

    useEffect(()=>{
        const aToken = localStorage.getItem("token")
        try {
            const sendData={
                access_token:aToken,
            }
            //this axios call is going to get logged in user data from the backend and store it in nuser variable
            axios.post("http://localhost:8000/users/displayuser",sendData).then((res)=>{
                    setUser(res.data)
            })
        } catch (error) {
            alert("unable to get data please connect to the backend")
        }
        
    })

    //this function is going to diable all  dates before today and it is being used in the date picker
    const disabledDate = (current) => {
        // Disable all dates before today
        return current && current < moment().endOf('day');
    };

    const hideModal =()=>{
        setIsModalOpen(false)
        navigate("/profile")
    }

    

    return(    
        <>
            {contextHolder}
        
        <div className="bookings-page">
        
            <h1>Booking Form</h1>
            <Form onFinish={bookTicket}>
                <Form.Item label="Name">
                    <Input placeholder={user?.name} disabled />
                </Form.Item>
                <Form.Item label="Email">
                    <Input placeholder={user?.email} disabled />
                </Form.Item>
                <Form.Item label="Phone Number" rules={[
                    {
                        required: true,
                        message: 'Please Enter phone number',
                    },
                ]}>
                    <Input placeholder="Enter your Ph.no" onChange={(e)=>setphno(e.target.value)} required/>
                </Form.Item>
                <Form.Item label="Address" rules={[
                    {
                        required: true,
                        message: 'Please Enter Address',
                    },
                ]}>
                    <Input placeholder="Enter your Address" onChange={(e)=>setAddress(e.target.value)} required />
                </Form.Item>
                <Form.Item label="Number of tickets" rules={[
                    {
                        required: true,
                        message: 'Please select number of tickets',
                    },
                ]}>
                    <InputNumber min={1} max={10} defaultValue={0} onChange={(value)=>setnNumTickets(value)} required/>
                </Form.Item>
                <Form.Item label="Select Date" rules={[
                    {
                        required: true,
                        message: 'Please choose date',
                    },
                ]}>
                    <DatePicker disabledDate={disabledDate} onChange={(value,dateString)=>setDate(dateString)} required/>
                </Form.Item>
                <Form.Item label= "confirm date">
                    <h3>{date}</h3>
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Please accept terms!',
                    },
                ]}>
                        <Radio required><a href="/privacy">Accept our privacy policies</a></Radio>
                </Form.Item>
                <Form.Item>
                    <h3>Total Price: {totalPrice}£</h3>
                </Form.Item>
                
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
            {/* this modal is going to display the booking details once the booking is confirmed */}
            <Modal open={isModalOpen} onCancel={hideModal} onOk={hideModal}>
                <h2>This just being a prototype i have not integrated a payment system</h2>
                <h1>Booking Confirmation</h1>
                <h2>Refrence Number: {booking.refid}</h2>
                <h2>Number of Tickets : {booking.numTickets}</h2>
                <h2>Date of Visit: {booking.date}</h2>
                <h2>Total Price : {booking.totalPrice}£</h2>
            </Modal>
        </div>
        </>
    )
}

export default BookingForm