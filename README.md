# 🌍 Event Management System (Frontend)

Timezone‑aware event scheduling app with multi‑profile support, built with React, Redux Toolkit, and TailwindCSS. This repo contains the **frontend** for the full-stack system.

## 🔗 Links

- **Live Frontend**:  
  `https://event-management-system-frontend-sigma.vercel.app/`
- **Live Backend API**:  
  `https://eventmanagementsystem-backend-v8xv.onrender.com/`
- **Frontend GitHub Repo**:  
  `https://github.com/anshultiwari95/EventManagementSystem-Frontend`
- **Backend GitHub Repo**:  
  `https://github.com/anshultiwari95/EventManagementSystem-Backend`

---

## 🚀 Features

- **👤 Profile Management**
  - Create profiles
  - Search profiles
  - Prevent duplicate names
  - Multi-select profiles in events

- **📅 Event Management**
  - Create events with timezone support
  - Assign multiple profiles to a single event
  - Edit & reschedule events
  - View events per selected profile

- **🕒 Timezone Conversion**
  - Events stored in UTC
  - Original event timezone stored
  - Displayed dynamically in selected viewing timezone

- **📝 Event Logs**
  - Track reschedules and profile changes
  - View previous vs updated values
  - UTC timestamps, rendered in selected timezone

- **🎨 Clean UI**
  - TailwindCSS + Heroicons
  - Modal-based editing (create / edit event, view logs)
  - Scrollable event list and dropdowns

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- Axios
- TailwindCSS
- Heroicons
- Day.js (UTC + Timezone + Timezone conversion helpers)

**Backend (separate repo)**
- Node.js, Express.js
- MongoDB + Mongoose

---

## 📂 Project Structure

High level folders in this repo:

```text
src/
  api/            # Axios API wrappers for events & profiles
  components/     # Reusable UI components (forms, modals, cards, dropdowns)
  features/       # Redux slices (events, profiles)
  pages/          # Top-level pages (EventDashboard)
  store/          # Redux store configuration
  utils/          # Timezone utilities (dayjs helpers)
```

---

## 🧑‍💻 Getting Started (Frontend)

```bash
git clone https://github.com/anshultiwari95/EventManagementSystem-Frontend.git
cd EventManagementSystem-Frontend
npm install
npm run dev
```

By default the frontend talks to the deployed backend at:

```text
https://eventmanagementsystem-backend-v8xv.onrender.com/
```

This base URL is configured directly in:
- `src/api/eventApi.js`
- `src/api/profileApi.js`

If you want to point to a local backend instead, update those files to use your local API URL.

---

## 📦 Production Build

```bash
npm run build
```

This generates the optimized production build in the `dist` folder, ready to be deployed (e.g. Vercel).
