import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4zPoc3iWEAZEJY7I2Hgazl--f0WXb60M",
  authDomain: "budbase-c9a43.firebaseapp.com",
  projectId: "budbase-c9a43",
  storageBucket: "budbase-c9a43.firebasestorage.app",
  messagingSenderId: "226459351655",
  appId: "1:226459351655:web:bb77ab0005a3635d4a72c2"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore()
const auth = getAuth()

const authState = () => {
  return auth
}

const registerUser = async(email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
  .then((credentials) => {
    return credentials.user
  }).catch((err) => {
    return false
  })

}

const signInUser = async(email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
  .then((credentials) => {
    return credentials.user
  }).catch((err) => {
    return false
  })
  
}
const signOutUser = () => {
  signOut(auth).then(()=> {
    return true
  }).catch((err) => {
    return false
  })
}



export {
  registerUser,
  signInUser,
  signOutUser,
  authState
}