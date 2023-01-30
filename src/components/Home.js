import React from "react";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { user } = useUserAuth();
  const { logOut } = useUserAuth();
  console.log("user: ", user);
  const handleLogOut = async () => {
    try {
      await logOut();
      
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br /> {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Home;
