// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAhEeOSwZNqu_3ImGCQFE7fC0SnbtDEPIU",
  authDomain: "attendace-9b951.firebaseapp.com",
  projectId: "attendace-9b951",
  storageBucket: "attendace-9b951.firebasestorage.app",
  messagingSenderId: "561175913101",
  appId: "1:561175913101:web:bf20d24d7793cc9c4138c4",
  measurementId: "G-HH08SDHMK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


//web = 1060622069160-o567l17bq4l0anlpfn9kifuk7he9udnm.apps.googleusercontent.com