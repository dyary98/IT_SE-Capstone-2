// AddUser.js
import { authentication } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";

export const addUser = async ({
  email,
  password,
  fullName,
  longitude,
  latitude,
}) => {
  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    const user = userCredential.user;

    // Add additional user details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      userRole: 2, // Assuming 2 is the role you want to assign
      // Add longitude and latitude to the user document
      longitude: longitude || null, // If longitude is not provided, store null
      latitude: latitude || null, // If latitude is not provided, store null
    });

    return user;
  } catch (error) {
    console.error("Error in addUser: ", error);
    throw error; // Rethrow the error to be handled or displayed by the calling function
  }
};
