#  Task Manager

A backend application built using Node.js and Express that allows users to manage their daily tasks along with complete user account management. It includes authentication with access and refresh tokens, profile handling, and a modular backend structure.

---

## 🚀 Features

* User login with access and refresh token system
* Secure token management using JWT
* Create, get, update, and delete user profile
* Update user password securely
* Create, get, update, and delete tasks
* Task pagination, sorting, and filtering
* Modular and scalable folder structure
* Centralized error handling and validation

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

---

## ⚙️ Installation & Setup

1. Clone the repository

```id="clone-final"
git clone https://github.com/Juhi-Dubey/TaskManager.git
cd TaskManager
```

2. Install dependencies

```id="install-final"
npm install
```

3. Create a `.env` file in the root directory and add:

```id="env-final"
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

4. Run the server

```id="run-final"
npm run dev
```

---

## 📡 Endpoints

### 🔐 Authentication

* **POST** `/auth/login` → Login user
* **POST** `/auth/refresh-token` → Generate new access token

---

### 👤 Users

* **POST** `/users/create` → Create user
* **GET** `/users/profile` → Get user profile
* **PUT** `/users/update` → Update user profile
* **PUT** `/users/update-password` → Update password
* **DELETE** `/users/delete` → Delete user

---

### 📋 Tasks

* **POST** `/tasks` → Create task
* **GET** `/tasks?limit=10&page=2&order=asc` → Get tasks with pagination & sorting
* **PATCH** `/tasks/:id` → Update task
* **DELETE** `/tasks/:id` → Delete task

---

## 📂 Project Structure

```id="structure-final"
src
├── auth
│   ├── providers
│   ├── services
│   ├── validators
│   ├── auth.controller.js
│   └── auth.router.js
│
├── users
│   ├── providers
│   ├── services
│   ├── validators
│   ├── user.schema.js
│   ├── users.controller.js
│   └── users.router.js
│
├── tasks
│   ├── providers
│   ├── services
│   ├── validators
│   ├── tasks.schema.js
│   ├── tasks.controller.js
│   └── tasks.router.js
│
├── helpers
├── middleware
└── index.js

.env
```

---

## 📚 Key Learnings

* Implemented authentication using access and refresh tokens
* Built complete user account lifecycle (create, update, delete)
* Designed modular backend using feature-based structure
* Implemented pagination and sorting for scalability
* Improved error handling and validation

---

## 🔗 Project Link

GitHub Repository:
https://github.com/Juhi-Dubey/TaskManager

---

## 📄 License

This project is licensed under the MIT License.
