from fastapi import FastAPI
from routers.emotion_predictor import router as emotion_router
from pydantic import BaseModel
from database import engineconn
# from models import Book
from models import GenreDict
from typing import List
from models import Book
from fastapi import Body


app = FastAPI()
engine = engineconn()
session = engine.sessionmaker()
app.include_router(emotion_router)



# @app.get("/rec/bookwave")
# async def DB테스트():
#     example = session.query(Book).all()
    
#     return example


