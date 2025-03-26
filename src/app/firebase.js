import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Debug environment variables
console.log('Loading Firebase with config:', {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

const firebaseConfig = {
  apiKey:  "AIzaSyDQo35Q_emKjMYK4zd-zQ-pVXm2wwd51Lk",
  authDomain: "valetbookingapp.firebaseapp.com",
  databaseURL:  "https://valetbookingapp-default-rtdb.firebaseio.com",
  projectId:  "valetbookingapp",
  storageBucket:"valetbookingapp.appspot.com",
  messagingSenderId: "582291223613",
  appId: "1:582291223613:web:2721c2b8a80ef140f2e654"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };