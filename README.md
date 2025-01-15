# Whispr Chat App

Whispr Chat is a modern, feature-rich real-time chat application built using the MERN stack. Designed for seamless communication, it currently supports one-to-one chats, with exciting features like group chats, customizable themes, and video calling in development.

## Key Features

### 1. **User Authentication**
- **Secure Sign-Up and Login**: Users can create accounts and log in securely using email and password authentication.

### 2. **User Profile Management**
- **Profile Page**: Each user has a dedicated profile page displaying their username, email, and profile picture, last updated, member since.
- **Bio Update**: Users can add or edit a personal bio to share more about themselves.
- **Profile Picture Upload**: Upload and change profile pictures to personalize accounts.

### 3. **Real-Time One-to-One Chat**
- **Instant Messaging**: Real-time text messaging between users.
- **Online Status Indicators**: Visual cues to show if a user is online or offline.
- **Message Timestamps**: Each message displays the time it was sent.

### 4. **User Search and Filtering**
- **Search by Username**: Quickly find other users by searching for their username.
- **Online/Offline Filtering**: Filter user lists to display only online or offline users, enhancing the chat experience.

---

*Note: Features under development, such as group chats, customizable themes, and video calling, are not included in this list.*

## Tech Stack

- **Frontend**: React.js, TailwindCSS, zustand
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)

---

## How to Run the Project Locally

Follow the steps below to set up and run the Whispr Chat app on your local system.

### 1. Clone the Repository
```bash
git clone https://github.com/Vaibhav-Chitransh/whispr-chat.git
cd whispr-chat
```

### 2. Install Dependencies
#### Backend
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install required packages:
   ```bash
   npm install
   ```

#### Frontend
1. Navigate to the `client` folder:
   ```bash
   cd ../client
   ```
2. Install required packages:
   ```bash
   npm install
   ```

### 3. Set Up Environment Variables
1. Create a `.env` file in the `server` folder and add the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   SOCKET_PORT=6001
   ```

### 4. Start the Application
#### Backend
1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

#### Frontend
1. Start the frontend server:
   ```bash
   cd client
   bun run dev
   ```

### 5. Access the Application
1. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Future Roadmap

### Upcoming Features
- **Group Chat**: Enhanced group communication functionality.
- **Customizable Themes**: User-selectable themes to improve UX.
- **Video Calling**: Fully functional video conferencing within chats.
- **File Sharing**: Share files and media directly in conversations.
- **Push Notifications**: Stay updated with real-time notifications.

---

## Contribution Guidelines

We welcome contributions from the community! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push the branch.
4. Submit a pull request with a detailed description of your changes.

---

## Contact

For any queries or support, feel free to reach out:
- **Email**: vaibhavchitranshbdn@gmail.com
- **GitHub**: [Vaibhav-Chitransh](https://github.com/Vaibhav-Chitransh)

---
