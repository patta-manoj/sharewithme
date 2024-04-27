import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const API_KEY = process.env.REACT_APP_API_KEY;


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app) ;
export default storage ;



























// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: "AIzaSyC-UPR68MC7X-gJ_U9v_ZD_-tR77IvPoNE",
//   authDomain: "sharewithme-88880.firebaseapp.com",
//   projectId: "sharewithme-88880",
//   storageBucket: "sharewithme-88880.appspot.com",
//   messagingSenderId: "472448853918",
//   appId: "1:472448853918:web:569a8616dac8ac92f5588f",
//   measurementId: "G-VVR4TZ8WJ1"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

