
import "./planmytrip.css"
import { Card } from "antd";
import pic2 from "../../assets/asset2.png"
import pic3 from "../../assets/asset3.png"
import NavButton from "../../components/NavButtons/NavButtons";



const Planmytrip =()=>{
    return(
        <div className="plan-my-trip">
        <div className="plan-trip">
            <h1>Plan your trip to<br/>our zoo Here</h1>
        </div>
        <div className="booking_card">
            <Card bordered={false} style={{width:340,backgroundColor:"#FBB03B",color:"black",fontFamily:"Irish Grover",fontSize:20}} 
            cover={<img alt="Hotel img" src={pic2} style={{height:200}}/>}>
                <p>Facilities at the hotel:</p>
                <ul>
                    <li>BreakFast Included</li>
                    <li>Swimming pool</li>
                    <li>rooms with zoo theme</li>
                    <li>Library</li>
                    <li>Gym</li>
                    <li>Spa</li>
                    <li>Mud Bath</li>
                </ul>
                <p>Price:45£pp/Night</p>
                <NavButton name="Book Now" link="/hotelBook"/>
                </Card>
                <Card bordered={false} style={{width:340,backgroundColor:"#FBB03B",color:"black",fontFamily:"Irish Grover",fontSize:20}} 
            cover={<img alt="Hotel img" src={pic3} style={{height:200}}/>}>
                <p>Facilities at the Zoo:</p>
                <ul>
                    <li>One whole day of exploration</li>
                    <li>Engage with different animals</li>
                    <li>Be able to feed animals</li>
                    <li>Enjoy the best time with animals</li>
                    <li>Learn with animals</li>
                </ul>
                <p>Price:25£pp</p>
                <NavButton name="Book Now" link="/booking"/>
                </Card>
        </div>
        </div>
    )
}

export default Planmytrip;