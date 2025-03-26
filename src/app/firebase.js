import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Debug environment variables
console.log('Loading Firebase with config:', {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDQo35Q_emKjMYK4zd-zQ-pVXm2wwd51Lk",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "valetbookingapp.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://valetbookingapp-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "valetbookingapp",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "valetbookingapp.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "582291223613",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:582291223613:web:2721c2b8a80ef140f2e654"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };