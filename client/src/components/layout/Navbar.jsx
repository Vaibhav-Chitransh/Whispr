import { userStore } from "@/store/userStore";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, MessageCircleMore, User } from "lucide-react";
import { Settings } from "lucide-react";

const Navbar = () => {
  const { user, setUser, disconnectSocket } = userStore();

  const handleLogout = () => {
    disconnectSocket();
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow mx-2">
      <Link to={user ? "/" : "/login"}>
        <div className="flex items-center cursor-pointer">
          <MessageCircleMore className="mr-2" size={32} />
          <h1 className="text-2xl font-bold">Whispr</h1>
        </div>
      </Link>
      <div className="flex items-center">
        {user ? (
          <>
            <Link to="/settings" className="mr-4">
              <Button>
                <Settings /> Settings
              </Button>
            </Link>
            <Link to="/profile" className="mr-4">
              <Button>
                <User /> Profile
              </Button>
            </Link>
            <Link to="/login" className="mr-4">
              <Button onClick={handleLogout}>
                <LogOut /> Logout
              </Button>
            </Link>
          </>
        ) : (
          <Link to="/settings" className="mr-4">
            <Button>
              <Settings /> Settings
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
