import { useChatStore } from "@/store/useChatStore";
import Avatar from "./Avatar";
import React, { useEffect, useState } from "react";
import { userStore } from "@/store/userStore";
import { SkeletonDemo } from "../ui/skeleton";
import { Input } from "../ui/input";
import { CircleX } from 'lucide-react';
import { MakeGroup } from "./MakeGroup";
import { OnlineCheckbox } from "./OnlineCheckbox";

const Sidebar = () => {
  const { users, getUsers, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = userStore();
  const [showOnline, setShowOnline] = useState(false);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().startsWith(inputVal.toLowerCase()) || user.fullName.toLowerCase().includes(inputVal.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-gray-100 h-screen overflow-y-scroll custom-scrollbar">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 items-center relative">
          <Input
            type="text"
            placeholder="search . . ."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <CircleX className="cursor-pointer absolute right-1 text-gray-500" size={20} onClick={() => setInputVal('')} />
        </div>
        <MakeGroup />
      </div>
      <OnlineCheckbox showOnline={showOnline} setShowOnline={setShowOnline} />
      {isUsersLoading ? (
        <SkeletonDemo />
      ) : (
        filteredUsers.map((user) => {
          if (showOnline && !onlineUsers.includes(user._id)) return null;
          return (
            <div
              key={user._id}
              className="user-item flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedUser(user)}
            >
              <Avatar src={user.profilePic} alt={"profilePic"} />
              <div className="ml-2">
                <p className="font-semibold">{user.fullName}</p>
                <p
                  className={
                    onlineUsers.includes(user._id)
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
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
