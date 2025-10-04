# 📚 BookSwap Marketplace - Full Stack Book Trading Platform

BookSwap Marketplace is a modern **MERN stack** web application that enables book lovers to discover, share, and exchange books with fellow readers. It’s designed to provide a seamless and secure swapping experience with a clean, user-friendly interface.

---

## 🚀 Features

- 🔍 **Discover Books** – Browse and explore books shared by a diverse community of readers  
- 📤 **Share Your Collection** – Upload and showcase books you want to exchange  
- 🔄 **Swap System** – Trade books with others using an intuitive swapping process  
- 👥 **Community** – Connect with like-minded readers in your area  
- 🔐 **Secure Authentication** – JWT-based login and signup for safe user access  
- ☁️ **Image Hosting** – Cloudinary integration for seamless book image uploads  

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React (with Vite)** – Fast and modern development  
- 🎨 **Tailwind CSS** – Utility-first responsive design  
- 🗺️ **React Router DOM** – Client-side routing  
- 🔔 **React Hot Toast** – Elegant user notifications  
- 🖼️ **React Icons** – Beautiful icon library  
- 🌐 **Axios** – HTTP client for API requests  

### **Backend**
- 🟢 **Node.js** – JavaScript runtime environment  
- ⚡ **Express.js** – Backend framework for APIs  
- 🍃 **MongoDB** – NoSQL database  
- 🛠️ **Mongoose** – Object modeling for MongoDB  
- 🔑 **JWT (JSON Web Tokens)** – Authentication & authorization  
- 🔒 **bcryptjs** – Password hashing for security  
- 🌍 **CORS** – Cross-origin resource handling  
- ⚙️ **dotenv** – Environment variable management  
- ☁️ **Cloudinary** – Image storage and management 

## 📂 Project Setup

### 1️⃣ Clone Repository

- git clone https://github.com/keshavjatt/BookSwap-Marketplace.git
- cd BookSwap-Marketplace

### 2️⃣ Backend Setup
**Create a .env file inside the backend folder with the following variables:**

MONGODB_URI=mongodb://localhost:27017/Bookswap_DB
- JWT_SECRET=abcd123
- FRONTEND_URL=http://localhost:5173
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret
- PORT=5000

**Run Backend:**
- cd backend
- npm install
- npm run dev


### 3️⃣ Frontend Setup
**Create a .env file inside the frontend folder with the following variable:**

- VITE_API_BASE_URL=http://localhost:5000/api

**Run Frontend:**
- cd frontend
- npm install
- npm run dev
