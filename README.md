# 🏡 RoomieSync

**Created by: Deepshikha Bhardwaj**

RoomieSync is a web-based roommate matching platform designed for college students. It simplifies the process of finding compatible roommates based on preferences like location, gender, academic year, lifestyle habits, and more. Built with a strong Java + Spring Boot backend and a modern React frontend, RoomieSync offers a clean user experience and strong backend logic.

---

## 🚀 Features

- 📝 User Registration & Login
- 🧑‍🎓 Profile Editing (Name, Email, Phone, Academic Year, etc.)
- 🌍 Set Roommate Preferences (smoking, drinking, bedtime, etc.)
- 💡 Match Roommates based on mutual preferences
- 📄 View Detailed Roommate Profiles
- ❌ Delete Account functionality
- 🔒 Secure form validation and proper routing
- 📱 Fully responsive and clean UI

---

## 🧱 Tech Stack

### 🖥 Frontend:
- **React.js** with React Router
- Axios for API calls
- CSS modules for styling

### ⚙️ Backend:
- **Java 17**
- **Spring Boot 3.x**
- Spring Data JPA (Hibernate)
- RESTful API architecture
- MySQL for database

---

## 🗄️ Database Schema Overview

- `users` table:
  - Stores all user credentials and profile information
- `roommate_profiles` table:
  - Stores roommate preference info linked via `user_id`

🔗 One-to-One relationship between `users` and `roommate_profiles`.

---

## 📌 Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/roomiesync.git
2. Backend Setup
Import as a Maven project in Eclipse

Update application.properties with your MySQL credentials

Run the Spring Boot app

3. Frontend Setup
bash
Copy
Edit
cd roommate-frontend
npm install
npm run dev
🧪 Sample Data & Matching Logic
30+ sample users already added to MySQL database

Matching logic uses:

Gender

Location

(Can be extended to consider lifestyle preferences)

🧪 Testing
All APIs tested with Postman and frontend integration

Full CRUD verified for users and preferences

Matching feature tested with real sample data

🙋‍♀️ About the Creator
Deepshikha Bhardwaj
3rd Year B.Tech (CSE)
Narula Institute of Technology
Kolkata, India

📬 Contact
📧 Email: deepshikha.b@example.com
📱 Phone: +91-XXXXXXXXXX
📃 License
This project is created for educational purposes. You may fork or reuse with proper credits.

“Finding a roommate shouldn’t feel like a gamble — RoomieSync helps you find the right fit.”

