import "./profile.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { Button,Form, Input, message } from "antd";
import { List } from "antd";
import { Modal,Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Profile =()=>{
    const [user, setUser] = useState(null)
    const [zooBooking,setzooBooking] = useState([])
    const [hotelBooking,sethotelBooking] = useState([])
    const [isModalOpen,setModalOpen] = useState(false) 
    const [singleBooking,setSingleBooking] = useState([])
    const [isModalOpenZoo,setModalOpenZoo] = useState(false)
    const [isModalOpenpsswd,setModalOpenpsswd] = useState(false) 
    const [password,setPassword] = useState("")
    const [newPsswd,setNewPsswd] = useState("")
    const [messageApi, contextHolder] = message.useMessage();
    const navigate  = useNavigate()
    
    const getData=()=>{
        const aToken = localStorage.getItem("token")
        //this call request is being used to retrieve the users data from the backend.
        const sendData = {
            access_token : aToken
        }
        axios.post("http://localhost:8000/users/displayuser",sendData).then((res)=>{
            setUser(res.data)
            setzooBooking(res.data.zooTickets)
            sethotelBooking(res.data.hotelBookings)
           
        })
    }

    useEffect(()=>{

        getData()

    },[])

    function showModal(booking){
        setModalOpen(true)
        setSingleBooking(booking)
        
    }

    function showModalZoo(booking){
        setModalOpenZoo(true)
        setSingleBooking(booking)
        
    }

    function showModalpsswd(){
        setModalOpenpsswd(true)
    }

    function hideModal(){
        setModalOpen(false)
        setModalOpenZoo(false)
        setModalOpenpsswd(false)
    }


    const passwordChange=()=>{
        const atoken = localStorage.getItem("token")
        if (password !== user.password & newPsswd === password){
            messageApi.open({type:"error",content:"enter your correct old password or new password needs to be different from old password",duration:10})
            setModalOpenpsswd(true)
        }else{
                const dataSend={
                    access_token : atoken,
                    newPsswd:newPsswd
                }
                //this call will be used to call the change password functio  from the backend
                try{
                    axios.post("http://localhost:8000/users/changepassword",dataSend).then(res=>{
                        messageApi.open(
                        messageApi.open({type:"success",content:"password changed successfully",duration:10}))
                        setModalOpenpsswd(false)
                    })
                }catch (error){
                    const errorMessage = error.response.data.detail
                    messageApi.open({type:"error",content:errorMessage,duration:10})
                }
                
        }
    }


    return(
        <>

    
        {contextHolder}
        <div className="Profile-Dashboard">
            <h1>Your DashBoard</h1>
            <div className="dash-info">
            <div className="points-info">
                <h1>{user?.points} Points</h1>
            </div>
            <div className="profile-info">
                <Avatar size={64} icon={<UserOutlined />} />
                <h3>Name: {user?.name}</h3>
                <Button type="primary" onClick={()=>showModalpsswd()}>Change password</Button>
                <Modal open={isModalOpenpsswd} onOk={passwordChange} onCancel={hideModal} >
                <h2>Change password</h2>
                <Form >
                <Form.Item label="Old Password">
                    <Input placeholder="Enter old password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item label="New Password">
                    <Input placeholder="Enter new password" onChange={(e)=>setNewPsswd(e.target.value)} />
                </Form.Item>
                </Form>
                    
                </Modal>
            </div>
            </div>
            <div className="booking-info">
                <div className="Zoo-bookings">
                    Zoo tickets
                    <List 
                    align
                        dataSource={zooBooking}
                        renderItem={(bookingZoo)=>(
                            <List.Item >
                                <List.Item.Meta
                                    title={<>Booking Refrence: {bookingZoo.refid}</>}
                                    description={<>Visit Date: {bookingZoo.date}</>}
                                    /><Button onClick={()=>showModalZoo(bookingZoo)}>View</Button>
                            </List.Item>

                            
                        )}
                    />
                    {zooBooking ? <Button type="primary" onClick={()=>navigate("/booking")}>Book Ticket now</Button>: null}
                    <Modal title="Booking Details" open={isModalOpenZoo} onCancel={hideModal} onOk={hideModal}>
                            <h2>Booking refrence: {singleBooking.refid}</h2>
                            <h2>Date of visit : {singleBooking.date}</h2>
                            <h2>Number of Tickets : {singleBooking.numTickets}</h2>
                            <h2>Total Price: {singleBooking.totalPrice}£</h2>
                            
                    </Modal>
                </div>
                <div className="hotel-bookngs">
                Hotel Bookings
    
                <List 
                        dataSource={hotelBooking}
                        renderItem={(booking)=>(
                            <List.Item >
                                    <List.Item.Meta
                                    title={<>Booking refrence: {booking.refid}</>}
                                    description={<>Total Nights: {booking.totalNight}</>}
                                    />
                                    <Button onClick={()=>showModal(booking)}>View</Button>
                            </List.Item>
                        )}
                    />
                    {hotelBooking ? <Button type="primary" onClick={()=>navigate("/hotelBook")}>Book Hotel now</Button>: null}
                    <Modal title="Booking Details" open={isModalOpen} onCancel={hideModal} onOk={hideModal}>
                            <h2>Booking refrence: {singleBooking.refid}</h2>
                            <h2>CheckIn Date : {singleBooking.startDate} check-in after 12:00 noon</h2>
                            <h2>Check Out Dte : {singleBooking.endDate} check-out by 11.30 am</h2>
                            <h2>Total Rooms : {singleBooking.totalRoom}</h2>
                            <h2>Number of occupants : {singleBooking.numTickets}</h2>
                            <h2>Total Nights: {singleBooking.totalNight}</h2>
                            <h2>Total Price: {singleBooking.totalPrice}£</h2>
                            
                    </Modal>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;