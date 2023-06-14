import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyB_chjk6QCOFk5ucsHS3PLu5qHLezhYBQg",
  authDomain: "shopnow-e3ff1.firebaseapp.com",
  projectId: "shopnow-e3ff1",
  storageBucket: "shopnow-e3ff1.appspot.com",
  messagingSenderId: "959574390870",
  appId: "1:959574390870:web:41a47a27066b51b8be63f7"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
