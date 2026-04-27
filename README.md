# Billin Solutions Medical Billing
### Full-Stack MERN Application

**Company:** Billin Solutions Medical Billing  
**Tech Stack:** MongoDB · Express.js · React 18 · Node.js · Tailwind CSS

---

## 📁 Project Structure

```
billin-solutions/
├── backend/
│   ├── config/
│   │   └── seed.js              ← Seeds admin + sample blogs + popup
│   ├── middleware/
│   │   └── auth.js              ← JWT auth middleware
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Blog.js
│   │   ├── Contact.js
│   │   ├── Demo.js
│   │   └── Popup.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── demoRoutes.js
│   │   ├── popupRoutes.js
│   │   └── statsRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx      ← Sticky nav with dropdowns + topbar
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Popup.jsx       ← Auto popup ads from backend
│   │   │   │   ├── WhatsApp.jsx    ← Floating WhatsApp button
│   │   │   │   ├── PageHero.jsx
│   │   │   │   ├── CTABanner.jsx
│   │   │   │   ├── ContactForm.jsx
│   │   │   │   └── StatCounter.jsx
│   │   │   └── layout/
│   │   │       ├── PublicLayout.jsx
│   │   │       └── AdminLayout.jsx ← Sidebar admin dashboard
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── public/             ← 12 public website pages
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── AboutUs.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── ServiceDetail.jsx
│   │   │   │   ├── Specialties.jsx
│   │   │   │   ├── SpecialtyDetail.jsx
│   │   │   │   ├── States.jsx
│   │   │   │   ├── Pricing.jsx
│   │   │   │   ├── Blog.jsx
│   │   │   │   ├── BlogDetail.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   └── RequestDemo.jsx
│   │   │   └── admin/              ← 7 admin dashboard pages
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── Dashboard.jsx   ← Charts: area, pie, bar
│   │   │       ├── AdminContacts.jsx
│   │   │       ├── AdminDemos.jsx
│   │   │       ├── AdminBlogs.jsx
│   │   │       ├── AdminPopups.jsx
│   │   │       └── AdminSettings.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** v18 or higher → https://nodejs.org
- **MongoDB Atlas** account (free) → https://mongodb.com/cloud/atlas
- **Git** (optional)

---

### Step 1 — Configure Environment

```powershell
cd backend
copy .env.example .env
```

Open `backend\.env` in Notepad and fill in:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/billin-solutions
JWT_SECRET=billin_solutions_super_secret_2025
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@billinsolutions.com
ADMIN_PASSWORD=Admin@123
NODE_ENV=development
```

> **Get MongoDB URI:** Go to MongoDB Atlas → Connect → Drivers → copy the connection string

---

### Step 2 — Install Dependencies

Open **two PowerShell windows**:

**Window 1 — Backend:**
```powershell
cd backend
npm install
```

**Window 2 — Frontend:**
```powershell
cd frontend
npm install
```

---

### Step 3 — Seed the Database

```powershell
cd backend
npm run seed
```

This creates:
- ✅ Admin account (email + password from `.env`)
- ✅ 6 sample blog posts
- ✅ 1 popup ad

---

### Step 4 — Run the Project

**Backend** (Terminal 1):
```powershell
cd backend
npm run dev
```
→ API running at: `http://localhost:5000`

**Frontend** (Terminal 2):
```powershell
cd frontend
npm install   # Only first time — delete node_modules & package-lock.json if errors
npm run dev
```
→ Website at: `http://localhost:5173`

---

## 🌐 Pages & URLs

### Public Website
| Page | URL |
|------|-----|
| Home | `http://localhost:5173/` |
| About Us | `http://localhost:5173/about-us` |
| Services | `http://localhost:5173/our-services` |
| Service Detail | `http://localhost:5173/service/revenue-cycle-management` |
| Specialties | `http://localhost:5173/our-specialties` |
| Specialty Detail | `http://localhost:5173/specialties/mental-health-billing` |
| States | `http://localhost:5173/our-states` |
| Pricing | `http://localhost:5173/medical-billing-prices` |
| Blog | `http://localhost:5173/blog` |
| Blog Detail | `http://localhost:5173/blog/cpt-code-99204-billing-guidelines` |
| Contact | `http://localhost:5173/contact-us` |
| Request Demo | `http://localhost:5173/request-free-demo` |

### Admin Dashboard
| Page | URL |
|------|-----|
| Admin Login | `http://localhost:5173/admin/login` |
| Dashboard | `http://localhost:5173/admin` |
| Contacts | `http://localhost:5173/admin/contacts` |
| Demo Requests | `http://localhost:5173/admin/demos` |
| Blog Posts | `http://localhost:5173/admin/blogs` |
| Popup Ads | `http://localhost:5173/admin/popups` |
| Settings | `http://localhost:5173/admin/settings` |

**Default Admin Login:**
- Email: `admin@billinsolutions.com`
- Password: `Admin@123`

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/demo` | Submit demo request |
| GET | `/api/blog` | Get published blogs |
| GET | `/api/blog/:slug` | Get single blog |
| GET | `/api/popup/active` | Get active popup |
| POST | `/api/popup/:id/impression` | Track popup view |
| POST | `/api/popup/:id/conversion` | Track popup click |
| GET | `/api/health` | Health check |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current admin |
| POST | `/api/auth/change-password` | Change password |
| GET | `/api/contact` | List all contacts |
| PATCH | `/api/contact/:id` | Update contact status |
| DELETE | `/api/contact/:id` | Delete contact |
| GET | `/api/demo` | List all demos |
| PATCH | `/api/demo/:id` | Update demo status |
| DELETE | `/api/demo/:id` | Delete demo |
| POST | `/api/blog` | Create blog post |
| PUT | `/api/blog/:id` | Update blog post |
| DELETE | `/api/blog/:id` | Delete blog post |
| GET | `/api/popup` | List all popups |
| POST | `/api/popup` | Create popup |
| PUT | `/api/popup/:id` | Update popup |
| DELETE | `/api/popup/:id` | Delete popup |
| GET | `/api/stats` | Dashboard stats |

---

## ✨ Features

### Public Website
- ✅ Sticky navbar with dropdown menus & topbar (phone + email)
- ✅ Hero section with inline contact form
- ✅ 8 service cards with detail pages
- ✅ 12 specialty cards with detail pages
- ✅ 16 states + nationwide coverage section
- ✅ Animated stat counters (CountUp on scroll)
- ✅ 5-step process section
- ✅ Software ticker strip (auto-scrolling)
- ✅ 8 testimonials with star ratings
- ✅ Blog with category filter + search
- ✅ Full contact & demo request forms
- ✅ Pricing page with 3 tiers + FAQ accordion
- ✅ **Popup Ads** — auto-shows after configurable delay (managed from admin)
- ✅ **WhatsApp** floating button (+923100786960)
- ✅ Mobile responsive — hamburger menu
- ✅ Green medical theme (#1F6F5F / #2FA084 / #6FCF97)
- ✅ Billin Solutions logo throughout

### Admin Dashboard
- ✅ JWT-secured login
- ✅ Dashboard with Area chart, Pie chart, Bar chart (Recharts)
- ✅ KPI cards: total contacts, demos, blogs, active popups
- ✅ Contacts manager — view, update status, delete, export CSV
- ✅ Demo requests manager — view, update status, delete, export CSV
- ✅ Blog manager — create, edit, delete, publish/draft toggle
- ✅ Popup manager — create, edit, activate/deactivate, preview, track impressions/CTR
- ✅ Settings — change password, site info
- ✅ Mobile-friendly sidebar

---

## 🐛 Troubleshooting

**Rollup error on `npm run dev` (frontend):**
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

**MongoDB connection error:**
- Make sure your `MONGO_URI` in `.env` is correct
- Check Network Access in Atlas → Allow access from anywhere (0.0.0.0/0)

**Admin login fails:**
- Run `npm run seed` in the backend folder first
- Use credentials from your `.env` file

---

## 🎨 Color Theme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#1F6F5F` | Buttons, headings, accents |
| Primary Dark | `#164f45` | Hover states, dark sections |
| Accent | `#2FA084` | Links, icons, highlights |
| Accent Light | `#6FCF97` | Light accents, hero text |
| Dark | `#0d2420` | Footer, dark backgrounds |

---

## 📞 Contact Information (configured in project)

- **Phone:** +1 (224) 999-6997
- **WhatsApp:** +923100786960
- **Email:** info@billinsolutions.com
- **Address:** 708 Church Street, Suite #216, Evanston, IL 60201

---

Copyright © 2025 Billin Solutions Medical Billing. All rights reserved.
