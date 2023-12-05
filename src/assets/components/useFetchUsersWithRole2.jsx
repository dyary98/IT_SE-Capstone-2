import { useState, useEffect } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import IMAGES from "../../Images/Images";
import { db } from "../email_signin/config";

const useFetchUsersWithRole2 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userRole", "==", 2));
        const querySnapshot = await getDocs(q);

        const usersData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const userImagesRef = collection(db, "users", doc.id, "images");
            const imagesSnapshot = await getDocs(userImagesRef);
            const images = imagesSnapshot.docs.map(
              (imgDoc) => imgDoc.data().url
            );
            return {
              uid: doc.id,
              fullName: doc.data().fullName,
              images: images.length > 0 ? images : [IMAGES.Image2],
            };
          })
        );

        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error as needed
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useFetchUsersWithRole2;
