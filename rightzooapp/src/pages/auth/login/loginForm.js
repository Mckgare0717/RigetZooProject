import { useState } from "react"
import "./login.css"
import { Form, Button, Input,message } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate()

    const handleSubmit = () => {
        
        const sendData = {
            email: email,
            password: password
        }
        //this function will send user data to the backend and login the user
        axios.post("http://localhost:8000/users/login", sendData).then((res) => {
            console.log(res.data)
            localStorage.setItem("token",res.data.accessToken)
            navigate("/profile")
            messageApi.open({type:"success",content:"Login successful",duration:10})
            window.location.reload() //page will be refreshed by this function
        }).catch((err) => {
            const errorMessage = err.response.data.detail
            messageApi.open({type:"error",content:errorMessage,duration:10})
            
        })
    }

    return (
        <>
        {contextHolder}
        <div className="Login_Form">
        <h1>Login</h1>
            <Form  onFinish={handleSubmit}>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                    <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                    <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Item>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form>
            <h3>Don't have an account?<a href="/regAuth">Register</a></h3>
        </div>
        </>
    )
}