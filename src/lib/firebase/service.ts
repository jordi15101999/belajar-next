import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  where,
  query,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "Email already exist." });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register success" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}

export async function signInWWithGoogle(userData: any, callback: any) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(db, "users", data[0].id), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign in with google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({
          status: false,
          messsage: "Sign in with google failed",
        });
      });
  } else {
    userData.role = "member";
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign in with google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({
          status: false,
          messsage: "Sign in with google failed",
        });
      });
  }
}
