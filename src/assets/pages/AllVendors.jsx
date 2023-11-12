import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Card from "../components/Card";
import { db } from "../email_signin/config";
import IMAGES from "../../Images/Images";

const AllVendors = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userRole", "==", 2));
      const querySnapshot = await getDocs(q);
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" w-full p-8 flex flex-col justify-center mt-[200px]">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex justify-around items-start h-[50vh] w-full relative">
        {" "}
        {console.log(users)}
        {filteredUsers.map((user) => (
          <>
            <Card
              key={user.id}
              Id={user.id}
              name={user.fullName}
              description="Some description" // Use actual description if available
              image={user.images?.[0]?.url || IMAGES.Image1} // Provide a default image URL as a fallback
            />
            {user.id}{" "}
          </>
        ))}
      </div>
    </div>
  );
};

export default AllVendors;
