from datetime import datetime, timedelta
import jwt

from fastapi import HTTPException

from common import JWT_SECRET_KEY, TOKEN_EXPIRATION_MINUTES

def generate_token():
    """
    Generate JWT.
    """
    expiration = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_MINUTES)
    token = jwt.encode({"exp": expiration}, JWT_SECRET_KEY, algorithm="HS256")
    return token

def validate_token(token):
    """
    Validate token and raise exceptions if token is not valid
    """
    if token.credentials is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        # Validate the JWT token
        _ = jwt.decode(token.credentials, JWT_SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError as exception:
        raise HTTPException(status_code=401, detail="Token has expired") from exception
    except jwt.InvalidTokenError as exception:
        raise HTTPException(status_code=401, detail="Invalid token") from exception
