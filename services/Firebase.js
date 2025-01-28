import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  initializeAuth, 
  getReactNativePersistence, 
  signInAnonymously} from "firebase/auth";
  const { getFirestore, 
    collection, 
    onSnapshot, 
    query, 
    doc, 
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    where,
    setDoc,
    arrayRemove } = require("firebase/firestore");
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB4zPoc3iWEAZEJY7I2Hgazl--f0WXb60M",
  authDomain: "budbase-c9a43.firebaseapp.com",
  projectId: "budbase-c9a43",
  storageBucket: "budbase-c9a43.firebasestorage.app",
  messagingSenderId: "226459351655",
  appId: "1:226459351655:web:bb77ab0005a3635d4a72c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const USERINFO = "userInfo"

export {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,  
  getReactNativePersistence, 
  signInAnonymously,
  auth,
  db,
  USERINFO,
  collection,
  addDoc,
  deleteDoc,
  where,
  updateDoc,
  onSnapshot,
  query,
  doc,
  getDocs,
  setDoc,
  arrayRemove
}