# Collably

A full-stack MERN application that bridges the gap between **influencers** and **brand**, enabling seamless collaborations. The platform allows brands to explore influencer profiles, show interest, or ignore them in a Tinder-style interface & vice-versa. Influencers & brands can register, verify their accounts through OTP-based email verification, and showcase their details for potential partnerships.

---

## Features

- **Secure Authentication**
  - User registration and login with hashed passwords using **bcrypt**.
  - **JWT-based** authentication to protect private routes.
  - OTP-based email verification for added security (via Brevo).

- **User Role System**
  - Separate registration flows and dashboards for **Brands** and **Influencers**.
  - Only verified influencers & brands appear in the discovery section.

- **Media Upload**
  - Influencers can upload **cover and profile photos**.
  - Startups can upload **pitch decks** (PDFs).

- **Email Notification**
  - User receives a confirmation email when someone shows interest in thier profile.
  - User can also send direct emails via a textbox to the respective Influencer/Brand.

- **Smooth UI/UX**
  - Responsive design with animated elements using **Framer Motion**.
  - Custom text-outline styles and animated underlines for links.
  - User-friendly error handling and validation messages.

---

## Technologies Used

**Frontend**
- React.js
- Tailwind CSS
- Framer Motion
- React Router
- Font Awesome

**Backend**
- Node.js
- Express.js
- MongoDB
- bcrypt
- JSON Web Tokens (JWT)
- Brevo (for OTP-based email verification)
- Multer (for handling file uploads)
- CORS, Dotenv

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/manavv-13/Collably.git
cd Collably
cd backend
npm install
# Add a .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# BREVO_API_KEY=your_key
node app.js
```
```bash
cd frontend
npm install
npm run dev
```

## Future Improvements
- Admin dashboard for managing user roles.
- Notification system within the app.
- Chat functionality between matched users.



