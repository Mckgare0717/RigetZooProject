
import json

def getUsers():
    with open("schemas/userDb.json","+r") as file:#will open te json file and reat it
        return json.load(file) #the json file will be loaded into the variable
    
    
def saveUsers(newUser):
    with open("schemas/userDb.json","+w") as file: #will open the json file and write to it
        return file.write(json.dumps(newUser,indent=4))#the json file will be updated with the new data
        


    
def getAnimals():
    with open("schemas/animals.json","+r") as file:#will open the json file and read it
        return json.load(file) #the json file will be loaded into the variable
    
def getFacilities():
    with open("schemas/facilities.json","+r") as file:#will open the json file and read it
        return json.load(file) #the json file will be loaded into the variable