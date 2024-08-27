# uvicorn main:app --port 8000 --host 0.0.0.0

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import PlainTextResponse
from fastapi import FastAPI, Request, HTTPException
from fastapi import FastAPI
import os
# from dotenv import load_dotenv
# load_dotenv("./.env")

allowed_origins = [os.getenv('FRONTEND_URL', 'http://localhost:3000')]
allowed_referers = allowed_origins

async def verify_referer(request: Request):
    referer = request.headers.get('referer')
    if not referer:
        raise HTTPException(status_code=403, detail="Forbidden")
    if not any(referer.startswith(allowed_ref) for allowed_ref in allowed_referers):
        raise HTTPException(status_code=403, detail="Forbidden")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.middleware("http")
async def custom_origin_middleware(request: Request, call_next):
    try:
        await verify_referer(request)
        return await call_next(request)
    except HTTPException as ex:
        return PlainTextResponse(
            status_code=ex.status_code,
            content=ex.detail
        )

static_folder = os.getenv('FILE_STORAGE_STATIC_FOLDER', '../images')
app.mount("/static", StaticFiles(directory=static_folder), name="static")
