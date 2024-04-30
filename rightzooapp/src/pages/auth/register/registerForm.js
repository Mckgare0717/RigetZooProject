import { Form, Button, Input,message } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./register.css"
import { useState } from "react"

export const Register = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName] = useState("")
    const [confpsswd,setconfpsswd] =useState("")
    const navigate = useNavigate()
    const [ messageApi, contextHolder] = message.useMessage();

    const handleSubmit = (e) => {
        
        const sendData = {
            name:name,
            email: email,
            password: password
        }
        //new account registration is being sent to the backend.
        axios.post("http://localhost:8000/users/register", sendData).then((res) => {
            console.log(res.data)
            localStorage.setItem("token",res.data.accessToken)
            messageApi.open({type:"success",content:"Registration successful",duration:10})
            navigate("/profile")
            window.location.reload()// the page will be refreshed by this function.
        }).catch((err) => {
            const errorMessage = err.response.data.detail
            messageApi.open({type:"error",content:errorMessage,duration:10})
            console.log(err)
        })
    }

    const psswdCheck = ()=>{
        //here the password will be check if the password is same as the confirm passwordand the length is more than 8 chracters.
        if (password === confpsswd & password.length>8){
            handleSubmit()
        }
        else{
            alert("Passwords do not match or length of password needs to be more than 8 characters")
        }

    }

    return(
        <>
        {contextHolder}
        <div className="register-form">
            <h1>Register</h1>
            <Form onFinish={psswdCheck} >
                <Form.Item label= 'Name' rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        label: 'Name',
                    },
                ]}>
                    <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label= 'Email' rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                        label: 'Email',
                    },
                ]}>
                    <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Item>
                <Form.Item label="Password" rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                        
                    },
                ]}>
                    <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Item>
                <Form.Item label= 'Confirm Password' rules={[
                    {
                        required: true,
                        message: 'Please Confirm password!',
                        
                    },
                ]}>
                    <Input.Password placeholder="Confirm Password" onChange={(e) => setconfpsswd(e.target.value)} required />
                </Form.Item>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form>
            <h3>Already have an account?<a href="/loginAuth">Login</a></h3>
        </div>
        </>
    )
}