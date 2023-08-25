import logging
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Create a logger instance for your FastAPI application
logger = logging.getLogger("langchain-api")
logger.setLevel(logging.INFO)

# Create a StreamHandler to log messages to the console
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# Create a formatter to specify the log message format
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
console_handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(console_handler)

TOKEN_EXPIRATION_MINUTES = 30

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if JWT_SECRET_KEY is None:
    logger.warning("Environment variable (JWT_SECRET_KEY) is missing.")


# TODO: Should validate required environment variables and throw error/warning on boot up.