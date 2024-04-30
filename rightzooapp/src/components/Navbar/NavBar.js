import "./NavBar.css"

import NavButton from "../NavButtons/NavButtons"

import { Avatar,Button } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"


const LogoutBtn =()=>{
   const navigate = useNavigate()
    const tokenAuth = localStorage.getItem("token")
    
    function logOut(e){
        localStorage.removeItem("token")
        navigate("/")
        window.location.reload()
        
    }
    if (tokenAuth){
        return(
            <Button type="primary" style={{fontFamily:"Irish Grover",fontSize:25}} onClick={logOut}>Logout</Button>
        )
        
    }
}


const ProfileBtn = () => {
    
    const tokenAuth = localStorage.getItem("token")
    const navigate = useNavigate()
    if (tokenAuth){
        return(
            <Avatar size={40} icon={<UserOutlined onClick={()=>navigate("/profile")}/>} />
        )
} 
}

const NavBar = () => {
    const tokenAuth = localStorage.getItem("token")
    


    return (
        <div className="navBar">
            <div className="name">
                <h2>RZA</h2>
                <h3>Riget zoo Adventure</h3>
            </div>

            <div className="nav-btns">
                <NavButton name="Home" link="/" />
                <NavButton name="Plan Your Trip" link="/plan" />
                <NavButton name="Education" link="/education" />
                <NavButton name="About Us" link="/about" />
            </div>

            <div className="auth-btns">
            {tokenAuth === null && 
            <>
            <NavButton name="Login" link="/loginAuth" />
            <NavButton name="Register" link="/regAuth" />
            </>
                         }
                        
            <LogoutBtn/>
            <ProfileBtn/>

            </div>
        </div>
    )
}

export default NavBar;