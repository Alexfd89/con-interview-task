from data.db import SpaceDB, SearchHistoryDB
from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from models import CreateHistoryBody, GetHistoryQueryParams, GetHistoryResponse, SourceListResponse, SourceQueryParams

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = SpaceDB()

@app.get("/api/sources", response_model=SourceListResponse)
def get_sources(query: SourceQueryParams = Depends()):
     sources = db.get_all_sources()
     total = len(sources)
     offset = (query.page - 1) * query.limit
     data = sources[offset:offset + query.limit]
     
     if query.search:
         search_text = query.search.lower()
         data = [
             s for s in data
             if search_text in s["name"].lower() or search_text in s["description"].lower()
         ]
     
     return SourceListResponse(
         data=data,
         total=total,
         filters=query
     )
    
 

history_db = SearchHistoryDB()

@app.get("/api/sources/history")
def get_search_history(query: GetHistoryQueryParams = Depends()):
    data = history_db.get_all_search_history()
    total = len(data)
    offset = (query.page - 1) * query.limit
    data = data[offset:offset + query.limit]
    
    return GetHistoryResponse(
        data=data,
        total=total,
        filters=query
    )


@app.post("/api/sources/history", status_code=status.HTTP_201_CREATED)
def save_history(query: CreateHistoryBody):
    data = history_db.save(query.value)
    return data


@app.delete("/api/sources/history/{id}")
def delete_history(id: str):
    history_db.delete(id)
    return 




