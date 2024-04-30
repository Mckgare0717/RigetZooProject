import { Button } from "antd";
import {  useNavigate } from "react-router-dom";
import "./NavButtons.css"

const NavButton =({name,link})=>{
    const navigate= useNavigate()
    return(
        <div>
            <Button type="primary" style={{fontFamily:"Irish Grover",fontSize:25}} onClick={()=>navigate(link)}>{name}</Button>
        </div>
    )
}

export default NavButton