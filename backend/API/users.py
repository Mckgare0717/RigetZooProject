from pydantic import BaseModel
from fastapi import FastAPI,APIRouter,HTTPException
from schemas.util import getUsers,saveUsers,getAnimals,getFacilities
import jwt
import uuid
import random


class UserReg(BaseModel):
    name: str
    email: str
    password: str
    
class userLogin(BaseModel):
    email:str
    password:str
    
class displayUser(BaseModel):
    access_token:str

class zooTickets(BaseModel):
    access_token:str
    phno:str
    address:str
    numTickets:int
    date:str
    totalPrice:int
    
class hotelTickets(BaseModel):
    access_token:str
    phno:str
    address:str
    numTickets:int
    startDate:str
    endDate:str
    totalRoom:int
    totalNight:int
    totalPrice:int

class changePassword(BaseModel):
    access_token:str
    newPsswd:str

    
router = APIRouter()



@router.post("/register")
async def register(creds:UserReg):
    user= getUsers()
    key = "SECRET_KEY_001234"
    id = str(uuid.uuid1())
    encoded = jwt.encode({"id": id}, key, algorithm="HS256") # here the accesstoken is generated
    
    for u in user["users"]:
        if u["email"] == creds.email:#the user details are being check here to see if the email address the user is trying to register with is already in the database
            raise HTTPException(404,"User already exists")
     #new user object is being created so that it can be saved in the database.  
    newUser ={
        "name": creds.name,
        "email": creds.email,
        "password": creds.password,
        "accessToken": encoded,
        "points":10,
        "zooTickets": [],
        "hotelBookings": []
    }
    user["users"].append(newUser)#new user being appended in the database.
    saveUsers(user)
    return newUser
       
@router.post("/login")
async def login(creds:userLogin):
    users = getUsers()
    
    for i in users["users"]:
        if i["email"] == creds.email and i["password"] == creds.password: #checking if the username and password entered is correct from the and exists in the database.
            print("found")
            return i #if the username and pass word is correct the user will be logged in. and the user data will be sent to the frontend
        
    raise HTTPException(404,"Invalid credentials")

@router.post("/displayuser")
async def displayUser(token:displayUser):
    user = getUsers()
    for i in user["users"]: #here the user data is being sent to the frontend.
        if i["accessToken"] == token.access_token: #here access token is being check which is sent from the frontend nd the user data is being sent to the frontend
            return i
        
    raise HTTPException(404,"User not found")

@router.post("/zootickets")
async def zooTickets(info:zooTickets):
    user = getUsers()
    refid = random.randint(10000,99999) #here a random refrence number is being generated for each booking.
    for i in user["users"]:
        if i["accessToken"] == info.access_token:#access token being check if the user is available in the database
            newTicket = { #here a new ticket object is being created so that it can be saved in the user database.
                "refid":refid,
                "phno":info.phno,
                "address":info.address,
                "numTickets":info.numTickets,
                "date":info.date,
                "totalPrice":info.totalPrice
            }
            
            i["zooTickets"].append(newTicket)
            i["points"] += 10 #points are being added for the user once they book a zoo ticket
            saveUsers(user)
            return newTicket
        
    raise HTTPException(404,"your booking was unsuccessful")
    

@router.post("/hotelBookings")
async def hotelBookings(info:hotelTickets):
    user = getUsers()
    refid = random.randint(10000,99999) #random refid is being generated for each booking
    for i in user["users"]:
        if i["accessToken"] == info.access_token:#access token is being checked if the user is available in the database
            newBooking = { #here a new Booking object is being created so that it can be saved in the user database.
                "refid":refid,
                "phno":info.phno,
                "address":info.address,
                "numTickets":info.numTickets,
                "startDate":info.startDate,
                "endDate":info.endDate,
                "totalRoom":info.totalRoom,
                "totalNight":info.totalNight,
                "totalPrice":info.totalPrice
            }  
            i["hotelBookings"].append(newBooking)
            i["points"] += 20 # points are being added to the users account for booking a hotel
            saveUsers(user) #user data is being saved.
            return newBooking
            
       
    raise HTTPException(404,"your booking was unsuccessful") # if the booking operation is unsuccessful this message will be passed.
    
    
    
@router.post("/changepassword")
async def changepassword(info:changePassword):
    user = getUsers()
    
    for i in user["users"]:
        if i["accessToken"] == info.access_token:
            i["password"] = info.newPsswd #password is being updated.
            saveUsers(user)
            return {"message":"password changed successfully"}
    raise HTTPException(404,"password change unsuccessful please try again")
    
    
    
@router.get("/animalInfo")
async def animalInfo():#this function will send all the animals info to the frontend
    animals = getAnimals()
    return animals
    
@router.get("/facilities")
async def facilitiesInfo():#This function will send information about the facilities at the zoo to the frontend 
    facilities = getFacilities()
    return facilities

    
@router.get("/databaseLookup/{psswd}")
async def databaseLookup(psswd:str):
    data = getUsers()
    if psswd == "xander123":
            return data
    else:
        raise HTTPException(404,"you are not authorized to access this data")
    
    
    
    
    
    
    




