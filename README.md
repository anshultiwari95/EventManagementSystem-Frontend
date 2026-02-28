# 🌍 Event Management System

A full-stack MERN application that allows users to create and manage events across multiple timezones with multi-profile support.

Built with production-grade timezone handling, UTC storage logic, and dynamic profile-based filtering.

---

## 🚀 Live Demo

Frontend: https://event-management-system-frontend-sigma.vercel.app/
Backend API: https://eventmanagementsystem-backend-v8xv.onrender.com/ 

---

## 🚀 Github Repo

Frontend: https://github.com/anshultiwari95/EventManagementSystem-Frontend
Backend API: https://github.com/anshultiwari95/EventManagementSystem-Backend

---

## 🧠 Core Features

### 👤 Profile Management
- Create profiles dynamically
- Search profiles
- Switch active profile
- Persist selected profile
- Add profile directly from dropdown

### 📅 Event Management
- Create events for multiple profiles
- Timezone-aware event creation
- UTC-based storage (industry best practice)
- View events in any selected timezone
- Edit existing events
- Event update logs tracking

### 🌎 Timezone System
- Events saved in UTC
- Original event timezone stored
- Dynamically converted to viewing timezone
- Prevents past date creation
- Prevents past time creation

### 📜 Logs System
- Tracks previous and updated values
- Stores timestamp in UTC
- Displays in selected viewing timezone

### 🎨 UI/UX
- Polished dropdown system
- Searchable profile selector
- Scrollable event list container
- Responsive two-column layout
- Clean modern UI

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- Day.js (UTC + Timezone plugin)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Database
- MongoDB Atlas (Cloud)

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 🗄 Database Schema

### Event Model

```js
{
  profiles: [ObjectId],
  eventTimezone: String,
  startTimeUTC: Date,
  endTimeUTC: Date,
  logs: [
    {
      previousValues: Object,
      newValues: Object,
      updatedAtUTC: Date
    }
  ]
}