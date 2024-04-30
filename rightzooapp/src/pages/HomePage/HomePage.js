import pic1 from  '../../assets/asset1.jpg'
import "./HomePage.css"
import NavButton from '../../components/NavButtons/NavButtons'

const Homepage =()=>{
    return(
        <div className='homePG'>
            <img src={pic1} alt="giraffeimage" />
            <div className='welcomeText'>
                <p>We are the best zoo in the whole of UK<br/>with abest in-class on site Hotel</p>
    
            </div>
            {/* this section contains links used to connect to the main pages in the website.*/ }
            <div className='buttonsSections'>
                <NavButton name="Book Zoo Tickets" link={"/booking"}/>
                <NavButton name="Book On-site hotel" link={"/hotelBook"}/>
                <NavButton name="Try our educational tools" link={"/education"}/>
                <NavButton name="Know More About Us" link={"/about"}/>
                
            </div>
        </div>
    )
}

export default Homepage;