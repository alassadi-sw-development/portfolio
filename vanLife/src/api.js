import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyD0UNMQQSqI7pw-nm6O7CthPrrTg2xi8l8",
  authDomain: "vanlife-88a2f.firebaseapp.com",
  projectId: "vanlife-88a2f",
  storageBucket: "vanlife-88a2f.appspot.com",
  messagingSenderId: "120849736375",
  appId: "1:120849736375:web:b6448193aaac9edb19e332"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const snapshot = await getDoc(docRef)
  return {
      ...snapshot.data(),
      id: snapshot.id
  }
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"))
  const snapshot = await getDocs(q)
  const vans = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
  }))
  return vans
}

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}