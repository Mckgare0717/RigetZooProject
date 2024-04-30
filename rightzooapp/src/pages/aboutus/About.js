import { Card } from "antd";
import "./About.css";
import pic1 from "../../assets/asset4.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
const AboutUs =()=>{
    const [facilities,setFacilities] = useState([])

    useEffect(()=>{
        //this function will get data on facilities at the zoo from the backend and display it on the frontend
        axios.get("http://localhost:8000/users/facilities").then((res)=>{
            const facility = res.data.zooFacilities
            setFacilities(facility)
        }).catch((err)=>{
            alert("please connect to the frontend.")
        })
    })
    return(
        <div className="about-us-pg">
            <div className="about_info">
                <h1>About Us And Our Motive</h1>
                <p>Cras non ante blandit, posuere sapien ut, feugiat enim. Nulla dictum purus ac orci blandit efficitur. Quisque commodo eros ut dui venenatis, sit amet ornare arcu auctor. 
                Maecenas eu lorem quis augue tristique pretium vitae efficitur leo. In rutrum diam non augue condimentum, 
                a pellentesque odio lobortis. Donec scelerisque venenatis nulla, eget faucibus magna vestibulum at. Integer nec purus non orci volutpat dignissim.</p>

            </div>

            <div className="About-Facilities">
                <h1>All our facilities: </h1>
                <div className="facilities">
                {facilities.map((facility)=>(
                    <Card bordered={false}style={{width:500,backgroundColor:"#FBB03B",alignItems:"center",fontSize:50}} cover={<img alt={facility.name} src={facility.image} style={{height:200}}/>}>
                    <h6>Facility: {facility.name}</h6>
                    <h6>Description: {facility.description}</h6>
                    </Card>
                ))}
                </div>
            </div>
            {/* zoo timings */}
            <div className="about-info-cont">
                <div className="time-table">
                    <h1>Opening Times:</h1>
                    <h3>Monday 09:00-20:00</h3>
                    <h3>Tuesday 09:00-20:00</h3>
                    <h3>Wednesday 09:00-20:00</h3>
                    <h3>Thursday Closed</h3>
                    <h3>Friday 09:00-20:00</h3>
                    <h3>Saturday 10:00-20:00</h3>
                    <h3>Sunday 10:00-20:00</h3>
                </div>
                <div className="contact-dir-info">
                    <img alt="map-location" src={pic1}/>
                    <h1>1 Park st, UB1 2AB</h1>
                    <div className="contact">
                        <h1>Contact Details: </h1>
                        <h3>Contact Number: +44 0987654321</h3>
                        <h3>Email:info@rza.co.uk</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;
