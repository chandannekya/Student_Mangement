
# 🎓 Student Management Dashboard

A sleek React-based student management dashboard powered by Firebase Authentication and Firestore, styled with Tailwind CSS. It allows authenticated users to view, filter, and add student records.

## 🚀 Features

- 🔐 **Firebase Authentication** (Email/Password login)
- 🗃️ **View student records** from Firestore
- 🔍 **Filter students** by enrolled course
- ➕ **Add new students** (only for logged-in users)
- 💅 **Tailwind CSS** for responsive and clean UI
- ⚛️ **React (JavaScript)** frontend

## 🛠 Tech Stack

- **React** (JavaScript)
- **Firebase Authentication**
- **Firebase Firestore**
- **Tailwind CSS**
- **Vite**

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/chandannekya/Student_Mangement.git
cd Student_Mangement
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Email/Password** under **Authentication → Sign-in method**.
3. Set up **Firestore Database**.
4. Create a **Web App** in your Firebase project settings and copy the config.

Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:5173` to open the app.

## 🔒 Authentication Flow

* Users must log in to access the dashboard.
* Unauthenticated users are redirected to the login page.
* Authenticated users can view and add student entries.

## 🧠 Firestore Schema

Collection: `students`

Each document:

```json
{
  "name": "Alice Johnson",
  "class": "12A",
  "mobile": "9876543210",
  "course": "Mathematics"
}
```



## 🧑‍💻 Author

* GitHub: [@chandannekya](https://github.com/chandannekya)

## 📄 License

This project is licensed under the [MIT License](LICENSE).



