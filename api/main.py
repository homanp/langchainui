from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # Add frontend URL(s) here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_DATA = {
    "test": {
        "key1": {
            "users": [
                {
                    "no": 1,
                    "first_name": "Ricardo",
                    "last_name": "Algore",
                    "email": "ralgore0@github.com",
                    "gender": "Genderfluid",
                    "city": "Bledzew",
                },
                {
                    "no": 2,
                    "first_name": "Corene",
                    "last_name": "Esherwood",
                    "email": "cesherwood1@delicious.com",
                    "gender": "Female",
                    "city": "Hongkou",
                },
                {
                    "no": 3,
                    "first_name": "Decca",
                    "last_name": "Tubb",
                    "email": "dtubb2@oaic.gov.au",
                    "gender": "Male",
                    "city": "Polepy",
                },
                {
                    "no": 4,
                    "first_name": "Mic",
                    "last_name": "Sandiford",
                    "email": "msandiford3@nationalgeographic.com",
                    "gender": "Male",
                    "city": "Tonjongsari",
                },
                {
                    "no": 5,
                    "first_name": "Christabel",
                    "last_name": "Bourgeois",
                    "email": "cbourgeois4@ft.com",
                    "gender": "Female",
                    "city": "Hantsavichy",
                },
                {
                    "no": 6,
                    "first_name": "Burl",
                    "last_name": "Braine",
                    "email": "bbraine5@salon.com",
                    "gender": "Male",
                    "city": "Indaial",
                },
                {
                    "no": 7,
                    "first_name": "Jessa",
                    "last_name": "Scone",
                    "email": "jscone6@studiopress.com",
                    "gender": "Female",
                    "city": "Capacho Viejo",
                },
                {
                    "no": 8,
                    "first_name": "Paton",
                    "last_name": "Fronczak",
                    "email": "pfronczak7@jalbum.net",
                    "gender": "Male",
                    "city": "Donghai",
                },
                {
                    "no": 9,
                    "first_name": "Regan",
                    "last_name": "Kimblen",
                    "email": "rkimblen8@npr.org",
                    "gender": "Male",
                    "city": "Hebian",
                },
                {
                    "no": 10,
                    "first_name": "Rene",
                    "last_name": "Bentall",
                    "email": "rbentall9@feedburner.com",
                    "gender": "Male",
                    "city": "Bunol",
                },
            ]
        },
        "key2": {
            "users": [
                {
                    "no": 11,
                    "first_name": "Emlen",
                    "last_name": "Forte",
                    "email": "efortea@virginia.edu",
                    "gender": "Male",
                    "city": "Dahe",
                },
                {
                    "no": 12,
                    "first_name": "Bertine",
                    "last_name": "Headan",
                    "email": "bheadanb@nature.com",
                    "gender": "Non-binary",
                    "city": "Qal‘at Bīshah",
                },
                {
                    "no": 13,
                    "first_name": "Christel",
                    "last_name": "Tames",
                    "email": "ctamesc@nhs.uk",
                    "gender": "Female",
                    "city": "Tagta",
                },
                {
                    "no": 14,
                    "first_name": "Moll",
                    "last_name": "Harvard",
                    "email": "mharvardd@nationalgeographic.com",
                    "gender": "Female",
                    "city": "Dandian",
                },
                {
                    "no": 15,
                    "first_name": "Bobbie",
                    "last_name": "Ornelas",
                    "email": "bornelase@ow.ly",
                    "gender": "Female",
                    "city": "Dacudao",
                },
                {
                    "no": 16,
                    "first_name": "Bentley",
                    "last_name": "McManus",
                    "email": "bmcmanusf@reddit.com",
                    "gender": "Male",
                    "city": "Lewoluo",
                },
                {
                    "no": 17,
                    "first_name": "Gypsy",
                    "last_name": "Vitet",
                    "email": "gvitetg@123-reg.co.uk",
                    "gender": "Female",
                    "city": "Banjar Sambangan",
                },
                {
                    "no": 18,
                    "first_name": "Peta",
                    "last_name": "Pass",
                    "email": "ppassh@narod.ru",
                    "gender": "Female",
                    "city": "Chicoana",
                },
                {
                    "no": 19,
                    "first_name": "Rena",
                    "last_name": "Ambrus",
                    "email": "rambrusi@mac.com",
                    "gender": "Female",
                    "city": "Gongchang Zhen",
                },
                {
                    "no": 20,
                    "first_name": "Corbin",
                    "last_name": "Dandison",
                    "email": "cdandisonj@hibu.com",
                    "gender": "Male",
                    "city": "Tall Abyaḑ",
                },
            ]
        }
    }
}

class AddDatabase(BaseModel):
    database_name: str

@app.post("/databases")
async def add_database(user_data: AddDatabase):
    database_name = user_data.database_name
    if database_name in MOCK_DATA:
        return {"message": f"Database '{database_name}' connected"}

    MOCK_DATA[database_name] = {}
    return {"message": f"Database '{database_name}' created"}

@app.get("/databases/{database_name}/keyspaces")
async def get_keyspaces(database_name: str):
    database = MOCK_DATA.get(database_name)
    if database is not None:
        return list(database.keys())
    else:
        raise HTTPException(status_code=400, detail="Database does not exist")

@app.get("/databases/{database_name}/keyspaces/{keyspace_name}/tables")
async def get_tables(database_name: str, keyspace_name: str):
    database = MOCK_DATA.get(database_name)
    if database is not None:
        keyspace = database.get(keyspace_name)
        if keyspace is not None:
            return list(keyspace.keys())
        else:
            raise HTTPException(status_code=400, detail="Keyspace does not exist")
    else:
        raise HTTPException(status_code=400, detail="Database does not exist")

class CQLQuery(BaseModel):
    query: str

@app.post("/databases/{database_name}/cql")
async def run_cql_query(user_data: CQLQuery, database_name: str):
    query = user_data.query
    database = MOCK_DATA.get(database_name)
    if database is not None:    
        return {
            "query": query,
            "data": database["key1"]["users"]
        }
    else:
        raise HTTPException(status_code=400, detail="Database does not exist")

class NLQuery(BaseModel):
    query: str

@app.post("/databases/{database_name}/nl")
async def run_nl_query(user_data: NLQuery, database_name: str):
    query = user_data.query
    database = MOCK_DATA.get(database_name)
    if database is not None:
        return {
            "query": query,
            "data": database["key1"]["users"]
        }
    else:
        raise HTTPException(status_code=400, detail="Database does not exist")