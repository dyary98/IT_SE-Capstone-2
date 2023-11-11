// AddUser.js
import { authentication } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";
export const addUser = async ({ email, password, fullName }) => {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      const user = userCredential.user;
  
      // Add additional user details to Firestore
      try {
        
          await setDoc(doc(db, "users", user.uid), {
            fullName,
            email,
            userRole: 2, // Admin role
          });
      } catch (error) {
        console.log("i am here")
      }
  
      return user;
    } catch (error) {
      console.error("Error in addUser: ", error);
      throw error; // Rethrow the error to be handled or displayed by the calling function
    }
  };
  