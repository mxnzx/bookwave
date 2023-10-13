import os
from dotenv import load_dotenv
import redis

load_dotenv()

def redis_config() :
	
    try:
        REDIS_HOST = str = os.getenv("REDIS_HOST")
        REDIS_PORT = integer = os.getenv("REDIS_PORT")
        REDIS_DATABASE = integer = os.getenv("REDIS_DATABASE")
        rd = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
        # redis.StrictRedis( ... ) 라고도 사용할 수 있다
        # Python의 버전이 3으로 업데이트 되면서 함수명이 변경되었다
        # 하지만 버전 호환을 위해 StrictRedis로도 연결을 할 수 있다
        # 즉, Redis = StrictRedis로 동일한 기능을 하는 함수이다
		
    except:
        print("redis connection failure")

