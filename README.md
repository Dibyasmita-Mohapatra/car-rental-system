# 🚗 Full-Stack MERN Car Rental System

A modern, responsive, and feature-rich **Car Rental Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application provides a seamless experience for customers to browse cars, book rentals, manage bookings, and for administrators to manage the fleet through a dedicated admin dashboard.

---

## 📌 Features

### 👤 User Features

- User Registration & Login (JWT Authentication)
- Secure Protected Routes
- Browse Available Cars
- Search & Filter Cars
- Sort Cars by Price
- Detailed Car Information
- Car Image Gallery
- Book Cars Online
- Booking History
- User Dashboard
- Wishlist
- Compare Cars
- Responsive UI
- Toast Notifications

---

### 🔐 Authentication

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Authorization
- Admin & User Roles

---

### 🚙 Car Features

- Car Listings
- Car Details
- Car Gallery
- Car Specifications
- Features List
- Pricing Information
- Location Information
- Ratings

---

### 📅 Booking Features

- Book Available Cars
- Pickup & Return Date Selection
- Automatic Total Price Calculation
- Booking Status
- Cancel Booking
- Booking History

---

### 👨‍💼 Admin Features

- Admin Dashboard
- Add New Cars
- Delete Cars
- Manage Fleet
- View All Cars

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv
- CORS

---

## 📂 Project Structure

```
car-rental-system/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/car-rental-system.git

cd car-rental-system
```

---

### Install Client

```bash
cd client

npm install
```

---

### Install Server

```bash
cd ../server

npm install
```

---

### Create Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

### Run Backend

```bash
cd server

npm run dev
```

---

### Run Frontend

```bash
cd client

npm run dev
```

---

## 🔗 API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

### Cars

- GET `/api/cars`
- GET `/api/cars/:id`
- POST `/api/cars`
- PUT `/api/cars/:id`
- DELETE `/api/cars/:id`

### Bookings

- GET `/api/bookings`
- POST `/api/bookings`
- DELETE `/api/bookings/:id`

---

## 📸 Screenshots

> Add screenshots here after uploading images.

### Home Page

```
/screenshots/home.png
```

### Cars Page

```
/screenshots/cars.png
```

### Car Details

```
/screenshots/details.png
```

### Dashboard

```
/screenshots/dashboard.png
```

### Admin Panel

```
/screenshots/admin.png
```

---

## 🔮 Future Improvements

- Online Payment Gateway (Stripe/Razorpay)
- Car Availability Calendar
- Coupon & Discount System
- Email Notifications
- Booking Invoice PDF
- Admin Analytics Dashboard
- Car Reviews & Ratings
- Google Maps Integration
- Image Upload using Cloudinary
- Real-Time Booking Status

---

## 🎯 Learning Outcomes

This project demonstrates:

- Full-Stack MERN Development
- REST API Development
- Authentication & Authorization
- CRUD Operations
- MongoDB Database Design
- React Hooks
- Context API
- Responsive UI Design
- State Management
- API Integration
- Role-Based Access Control

---

## 👨‍💻 Author

**Dibyasmita Mohapatra**

GitHub: https://github.com/Dibyasmita-Mohapatra

LinkedIn: https://www.linkedin.com/in/dibyasmita-mohapatra-46a77b2a7/

---

## 📄 License

This project is developed for educational and portfolio purposes.
