import "./education.css"
import { Card, Input, Button,Modal } from "antd";
import { useEffect, useState } from "react"
import  axios  from "axios"


const Education = () => {

    const [animal, setAnimal] = useState("");
    const [animalInfo, setAnimalInfo] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [animals,setAnimals]  = useState([])
    const [loading,setLoading] = useState(true)
        


    if (animalInfo ===null ){
        return(
            <h1>Loading......</h1>
        )
    }

    const getAnimal = () => {
        //this call will get all the animal info from the external api and it will be stored in the animalInfo state.
        axios.get(`https://api.api-ninjas.com/v1/animals?name=${animal}&X-Api-Key=Kq1htBcMV7NKaICguq3PUQ==VernWy3ae0iPAT9u `).then((res) => {
            console.log(res.data[0])
            setAnimalInfo(res.data[0])
            console.log(animalInfo)
        })

        setIsModalOpen(true)
    }
    //here the close of the modal is handles.
    const handleCancel=()=>{
        setIsModalOpen(false)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        //this call will get information about a few animals from the backend and display it on the frontend.
        axios.get("https://rigetzooproject.onrender.com/users/animalInfo").then((res)=>{
            const animalsinformation = res.data
            setAnimals(animalsinformation.animals)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            alert("please connect to backend.")
        })
    })

    if (loading){
        return(
            <h2>Loading......</h2>
        )
    }
    

    return (
        <div className="educationpage">
            <div className="Edu-mat">
                <div className="Educ-maty">
                    <h1>Educational Material</h1>
                </div>
                {/* here when the owner of the zoo gives us some educational content we are going to diaplay it here. */}
                
                <div className="edu-cards">
                {animals.map((animal)=>(
                        <Card bordered={false} style={{ width:500, backgroundColor: "#FBB03B", alignItems: "center", fontSize: 50 }} cover={<img alt={animal.name} src={animal.image} style={{height:200}}/>}>
                        <h6>Name :{animal.name}</h6>
                        <h6>Scientific Name: {animal.scientificName}</h6>
                        <h6>Description : {animal.description}</h6>
                        </Card>
                    )) }
                    
                    
                </div>
            </div>
            <div className="animal-search">
                <h1>Enter animal name</h1>
                <Input placeholder="Enter Animal Name" onChange={(e) => setAnimal(e.target.value)} />
                <Button type="primary" shape="round" size="large" htmlType="submit" onClick={getAnimal}>
                    Search
                </Button>
                <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleCancel}>
                {/* here the animal information will be displayed */}
                    {animalInfo ? <div className="modal-cont">
                        <h1>Name: {animalInfo.name}</h1>
                        <h1>Family: {animalInfo?.taxonomy?.family}</h1>
                        <h1>Kingdom: {animalInfo?.taxonomy?.kingdom}</h1>
                        <h1>Scientific Name: {animalInfo?.taxonomy?.scientific_name}</h1>
                        <h1>Location : {animalInfo?.characteristics?.location}</h1>
                        <h1>Diet: {animalInfo?.characteristics?.diet}</h1>
                        <h1>Biggest Threat: {animalInfo?.characteristics?.biggest_threat }</h1>
                    </div>: <h1>Animal not found please try again</h1>}
                </Modal>
                
            </div>
            <h1>For Educational visits please contact our trip planning team : +44 0987654321 or email:plantrip@rza.co.uk</h1>
        </div>
    )
}

export default Education;
