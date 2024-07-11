import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="container mt-5 max-w-sm"> {/* Ensure proper container class for Bootstrap */}
      {userDetails ? (
        <div className="card p-4 shadow-sm">
          <div className="text-center">

            {userDetails.photo ? 
                <img
                src={userDetails.photo}
                alt="User"
                style={{ width: "40%", borderRadius: "50%" }}
            /> : 
            <img
                src={"../public/logo192.png"}
                alt="User"
                style={{ width: "40%", borderRadius: "50%" }}
            />
            
            }
            </div>
            {/* <img
              src={userDetails.photo}
              alt="User"
              style={{ width: "40%", borderRadius: "50%" }}
            /> */}
          
          <h3 className="text-center mt-3">Welcome {userDetails.firstName} 🙏</h3>
          <div className="mt-3">
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
            {/* Uncomment if lastName is available */}
            {/* <p><strong>Last Name:</strong> {userDetails.lastName}</p> */}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default Profile;
