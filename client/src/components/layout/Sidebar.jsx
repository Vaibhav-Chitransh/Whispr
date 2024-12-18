import { useChatStore } from "@/store/useChatStore";
import { Loader } from "lucide-react";
import Avatar from "./Avatar";
import React, { useEffect } from "react";

const Sidebar = () => {
  const { users, getUsers, setSelectedUser, isUsersLoading } = useChatStore();

  useEffect(() => {
    getUsers(); 
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto custom-scrollbar">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      {isUsersLoading ? (
        <Loader className="animate-spin" />
      ) : (
        users.map((user) => {
          return (
            <div
              key={user._id}
              className="user-item flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedUser(user)}
            >
              <Avatar src={user.profilePic} alt={user.fullName} />
              <div className="ml-2">
                <p className="font-semibold">{user.fullName}</p>
                <p
                  className={user.isOnline ? "text-green-500" : "text-red-500"}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Sidebar;