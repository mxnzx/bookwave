from fastapi import FastAPI
from routers.emotion_predictor import router as emotion_router

app = FastAPI()

# 라우터 모듈 등록
app.include_router(emotion_router)

@app.get("/")
def 이름():
  return '하하하'




