from typing import List, Union
import logging

from pydantic import AnyHttpUrl, BaseSettings, validator
from dotenv import load_dotenv
import os

load_dotenv()


