from API import users
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#this will connect the frontend to the backend
origins = [
    "https://localhost",
    "https://localhost:3000",
    "http://localhost",
    "http://localhost:3000",
    "*",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#this will connect the users api here.
app.include_router(users.router,tags=["users"],prefix="/users")


app.get("/")
def main():
    return {"message": "welcome home"}
 