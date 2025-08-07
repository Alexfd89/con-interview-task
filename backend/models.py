from typing import List, Optional
from pydantic import BaseModel, Field


class Source(BaseModel):
    id: int
    name: str
    type: str
    launch_date: str
    description: str
    image_url: Optional[str]
    status: str
    
class SourceQueryParams(BaseModel):
    search: Optional[str] = Field(None, description="Search term to filter sources")
    page: Optional[int] = Field(default=1, description="Current page number")
    limit: Optional[int] = Field(default=12, description="Maximum number of items to return")

class SourceListResponse(BaseModel):
    data: List[Source]
    total: int
    filters: SourceQueryParams
    
class History(BaseModel):
    id: str
    value: str
class GetHistoryQueryParams(BaseModel):
    page: int = 1
    limit: int = 10

class GetHistoryResponse(BaseModel):
    data: List[History]
    total: int
    filters: GetHistoryQueryParams
    
class CreateHistoryBody(BaseModel):
    value: str = Field(..., description="Value to be added to history")