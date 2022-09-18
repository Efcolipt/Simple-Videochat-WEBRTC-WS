import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDc2TAOkJHhg5SlM-PtHLjupJnJE3dURQg',
  authDomain: 'lt-meeting.firebaseapp.com',
  projectId: 'lt-meeting',
  storageBucket: 'lt-meeting.appspot.com',
  messagingSenderId: '58326936360',
  appId: '1:58326936360:web:12e26b61ced42b2d6fbe1d',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
