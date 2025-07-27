from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import random
from data.data import foods, colors

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

categories = {
    "colors": colors,
    "food": foods,
}

@app.get("/")
async def root():
    return FileResponse(os.path.join("static", "index.html"))

@app.get("/categories")
async def get_categories():
    return list(categories.keys())

@app.get("/pick/{category}")
async def pick_item(category: str):
    items = categories.get(category)
    if not items:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"result": random.choice(items)}

@app.get("/colors")
async def get_colors():
    return {"colors": colors}
