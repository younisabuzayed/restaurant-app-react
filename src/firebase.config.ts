import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const proEnv = process.env;
// console.log(proEnv);

const firebaseConfig = {
  apiKey: proEnv.REACT_APP_FIRSBASE_API_KEY,
  authDomain: proEnv.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: proEnv.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: proEnv.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: proEnv.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: proEnv.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: proEnv.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestoredb = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    firestoredb,
    storage,
};