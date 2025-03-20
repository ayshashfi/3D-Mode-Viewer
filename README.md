3D Model Viewer with Next.js and FastAPI

![Screenshot 2025-03-20 205419](https://github.com/user-attachments/assets/810ac7ca-9e5f-4d24-b5be-8cc4fd93474e)

📌 Overview
This project is a 3D Model Viewer built with Next.js and FastAPI.
It loads an .obj file with a texture and fetches metadata from both a Python backend (FastAPI) and a Next.js API route.

✨ Features
✅ Load & render 3D OBJ models using @react-three/fiber
✅ Fetch metadata from FastAPI backend
✅ Fetch additional data from Next.js API
✅ Display 3D model details in the UI

🚀 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/ayshashfi/3D-Mode-Viewer.git
cd 3D-Mode-Viewer

2️⃣ Start the Python Backend (FastAPI)
📌 Navigate to the backend folder and install dependencies:
cd backend
pip install -r requirements.txt
📌 Run the FastAPI Server
uvicorn main:app --reload
📌 Server is running at: http://localhost:8000
📌 API Endpoint:
GET /python-model-info → Returns model metadata
{
  "model_name": "Sample 3D Model",
  "vertex_count": 5000,
  "texture_details": "High Resolution"
}

3️⃣ Start the Next.js Frontend
📌 Navigate to the frontend folder and install dependencies:
cd 3d-viewer-frontend
npm install
📌 Run the Next.js Server
npm run dev
Frontend is running at: http://localhost:3000
📌 Next.js API Endpoint:
GET /api/nextjs-model-info → Returns additional metadata
{
  "scale": "1.0",
  "face_count": 2500,
  "source": "Next.js Backend"
}

🖼️ 3D Model & Texture
OBJ model and Texture image are stored in:

3d-viewer-frontend/public/model.obj
3d-viewer-frontend/public/texture.jpg


