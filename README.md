# Notes Application

A full-stack web application for creating, editing, and managing personal notes.  
Built with Node.js, Express, MongoDB (Mongoose), EJS, and Bootstrap-inspired custom CSS.  
Includes user authentication, registration, and flash messaging.

---

## Features

- **User Registration & Login:**  
  Secure user authentication with hashed passwords and session management.
- **Notes CRUD:**  
  Create, read, update, and delete notes for each user.
- **Flash Messages:**  
  User feedback for actions (success, error, etc.).
- **Responsive UI:**  
  Clean, modern, and mobile-friendly interface with a dark theme.
- **MongoDB Integration:**  
  All notes and users are stored in a MongoDB database.
- **Session & Cookie Management:**  
  Uses `express-session`, `connect-flash`, and `cookie-parser` for user sessions and flash messages.
- **Environment Variables:**  
  Sensitive data (session secret, DB URI) managed via `.env`.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templates, internal CSS (dark theme)
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** Sessions, JWT (for token generation)
- **Other:** connect-flash, express-session, cookie-parser, bcrypt

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/Anas-Nevrekar/Notes-Application.git
cd Notes-Application/server
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `server` directory:

```
SESSION_SECRET=your_very_secret_key
MONGODB_URI=mongodb://localhost:27017/myNotes
```

### 4. Start MongoDB

Make sure MongoDB is running locally or update `MONGODB_URI` for MongoDB Atlas.

### 5. Run the Application

```sh
npm start
```
or for development with auto-reload:
```sh
npm run dev
```

---

## Project Structure

```
server/
│
├── app.js                # Main Express app
├── config/
│   └── db.config.js      # MongoDB connection
├── controllers/
│   ├── home.controller.js
│   └── login.controller.js
├── models/
│   ├── note.model.js
│   └── user.model.js
├── routes/
│   ├── home.routes.js
│   └── loginPage.route.js
├── views/
│   ├── home.ejs
│   └── loginPage.ejs
├── .env                  # Environment variables (not committed)
└── package.json
```

---

## Usage

- **Register:** Create a new account on the Register form.
- **Login:** Log in with your credentials.
- **Add Note:** Use the form to add a new note.
- **Edit/Delete Note:** Use the update or delete buttons on your notes.
- **Logout:** End your session securely.

---

## Deployment

- Push your code to GitHub.
- Deploy on [Render](https://render.com/), [Railway](https://railway.app/), or any Node.js hosting.
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud database.
- Set environment variables (`SESSION_SECRET`, `MONGODB_URI`) in your hosting dashboard.

---

## Security

- Passwords are hashed using bcrypt.
- Session secrets and DB URIs are stored in `.env` and never committed.
- Flash messages provide user feedback for all actions.

---

## License

MIT

---

## Author

[Anas Nevrekar](https://github.com/Anas-Nevrekar)