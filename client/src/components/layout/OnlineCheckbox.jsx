"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { userStore } from "@/store/userStore";

export function OnlineCheckbox({ showOnline, setShowOnline }) {
  const { onlineUsers } = userStore();

  const handleClick = () => {
    setShowOnline(!showOnline);
  };

  return (
    <div className="flex items-center space-x-2 mt-3 mb-2">
      <Checkbox id="terms" onClick={handleClick} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show online only{" "}
        <span className="text-gray-500">({onlineUsers.length - 1} online)</span>
      </label>
    </div>
  );
}
