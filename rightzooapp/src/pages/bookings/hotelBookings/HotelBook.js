import "./HotelBook.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form,Input,Button,DatePicker,InputNumber,Radio,message, Modal } from "antd"
import moment from 'moment';
import axios from "axios";
import { useEffect } from "react";




const HotelBook = ()=>{
    const [phno,setphno] = useState("")
    const [address,setAddress] = useState("")
    const [numTickets,setnNumTickets] = useState(0)
    const [date,setDate] = useState([])
    const [ messageApi, contextHolder] = message.useMessage(); //this is to display the mesages.
    const { RangePicker } = DatePicker;
    const [room,setRoom] = useState(0)
    const [night,setNight] = useState(0)
    const totalPrice = (numTickets*45)*night//hotel price is being calculated
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    const [booking,setBooking] = useState([])
    const [isModalOpen,setIsModalOpen] = useState(false)

    

    useEffect(() => {
        //here if the user books room for more than 3 occupants this function is going calculate accordingly and give how many rooms the user will require.
        if (numTickets >= 3) {
            const totalRoom = Math.ceil(numTickets / 3); //average number is being calculated.
            setRoom(totalRoom);
        } else {
            setRoom(1);
        }

    const startDate = date[0]
    const endDate = date[1]
    //here the days betwen the start date and the end date of the user booking is calculated
    if (startDate && endDate){
        const start = moment(startDate)
        const end = moment(endDate)
        const diff = end.diff(start, 'days')
        setNight(diff)
    }else{
        setNight(0)
    }
    const aToken = localStorage.getItem("token")
    const sendData={
        access_token:aToken,
    }

    axios.post("https://rigetzooproject.onrender.com/users/displayuser",sendData).then((res)=>{
            setUser(res.data)
    })
    }, [numTickets,date]);

    
    const bookTicket=()=>{
        //here the booking is sent to the backend to get a refrence number 
        const aToken = localStorage.getItem("token")
        //the data that needs to be sent to the backend to be saved .
        const dataTosend = {
            access_token:aToken,
            phno:phno,
            address:address,
            numTickets:numTickets,
            startDate:String(date[0]),
            endDate:String(date[1]),
            totalRoom:room,
            totalNight:night,
            totalPrice:totalPrice,

        }

        axios.post("https://rigetzooproject.onrender.com/users/hotelBookings",dataTosend).then((res) => {
            console.log(res.data)
            setBooking(res.data) //booking data stored here
            setIsModalOpen(true) // modal is set to open to true
            //the below messages will be shown is the booking is successful
            messageApi.open({type:"success",content:"your Hotel Booking has been successful",duration:10})
            messageApi.open({type:"success",content:"you have received 20 points ",duration:10})
        }).catch((err) => {
            const errorMessage = err.response.data.detail
            messageApi.open({type:"error",content:errorMessage,duration:10})
        });

        
    }

    const hideModal=()=>{
        setIsModalOpen(false)
        navigate("/profile")
    }
    
    
    //the previos dates from today are being disabled here.
    const disabledDate = (current) => {
        // Disable all dates before today
        return current && current < moment().endOf('day');
    };
    return(
        <>
            {contextHolder}
        
        <div className="bookings-page">
        
            <h1>Booking Form</h1>
            <Form onFinish={bookTicket}>
                <Form.Item label="Name">
                    <Input placeholder={user?.name} disabled/>
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
                    <Input placeholder="Enter your Ph.no" onChange={(e)=>setphno(e.target.value)} required />
                </Form.Item>
                <Form.Item label="Address" rules={[
                    {
                        required: true,
                        message: 'Please Enter Address',
                    },
                ]}>
                    <Input placeholder="Enter your Address" onChange={(e)=>setAddress(e.target.value)} required />
                </Form.Item>
                <Form.Item label="Number of Occupants" rules={[
                    {
                        required: true,
                        message: 'Please select number of Occupants',
                    },
                ]}>
                    <InputNumber min={1} max={20} defaultValue={0} onChange={(value)=>setnNumTickets(value)} required/>
                </Form.Item>
                
                <Form.Item>
                    <h3>Number of rooms as per occupants: {room}</h3>
                </Form.Item>

                <Form.Item label="Select Date" rules={[
                    {
                        required: true,
                        message: 'Please choose date',
                    },
                ]}>
                    <RangePicker disabledDate={disabledDate} onChange={(value,dateString)=>setDate(dateString)} required/>
                </Form.Item>
                <Form.Item label= "confirm date">
                    <h3>{date[0]} to {date[1]}</h3>
                </Form.Item>
                <Form.Item>
                    <h3>Number of Nights: {night}Nights</h3>
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
            {/* once the form is submitted this modal opens and shows the booking details */}
            <Modal open={isModalOpen} onCancel={hideModal} onOk={hideModal}>
            <h2>This just being a prototype I have not integrated a payment system</h2>
                <h1>Booking Confirmation</h1>
                <h2>Refrence Number: {booking.refid}</h2>
                <h2>Number of Occupants : {booking.numTickets}</h2>
                <h2>Number of Rooms : {booking.totalRoom}</h2>
                <h2>Number of Nights : {booking.totalNight}</h2>
                <h2>Check In Date : {booking.startDate}</h2>
                <h2>Check Out Date : {booking.endDate}</h2>
                <h2>Total Price : {booking.totalPrice}£</h2>
            </Modal>
            
        </div>
        </>

    )
    }

export default HotelBook;