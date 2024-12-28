import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader, Pencil } from "lucide-react";
import { userStore } from "@/store/userStore";
import { UpdateBio } from "@/components/layout/UpdateBio";

const ProfilePage = () => {
  const {user, updateProfile, isUpdatingProfile} = userStore();
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return ;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setNewProfilePic(base64Image);
      await updateProfile({profilePic: base64Image});
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            <div className="relative">
              {isUpdatingProfile ?
                <div className="background-gray-100 animate-spin"> <Loader /></div> : 
                <>
                <img
                src={newProfilePic || user.profilePic || "/default_image.avif"}
                alt={user.fullName}
                className="h-32 w-32 rounded-full"
              />
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 opacity-0 cursor-pointer"
                id="profile-pic-input"
              />
              <label
                htmlFor="profile-pic-input"
                className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1 cursor-pointer"
              >
                <Pencil size={24} />
              </label>
              </>}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{user.fullName}</h2>
          </CardTitle>
          <CardDescription className="text-center">
            <div className="flex flex-col gap-4">
              <span>{user.email}</span>
              <div className="flex justify-between items-center gap-4">
                <p className="font-semibold text-black text-md border border-black px-2 py-1 rounded w-80">{user.bio}</p>
                <UpdateBio />
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <div>
          <CardHeader className='text-xl font-bold'>Account Information</CardHeader>
          <CardContent>
            <p className="text-gray-500 border-b mb-3 flex justify-between">
              <span className="font-bold">Member Since</span> <span>{new Date(user.createdAt).toLocaleTimeString()}</span> <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-500 border-b mb-3 flex justify-between">
              <span className="font-bold">Last Updated</span> <span>{new Date(user.updatedAt).toLocaleTimeString()}</span><span>{new Date(user.updatedAt).toLocaleDateString()}</span>
            </p>
            <p className='flex justify-between'>
              <span className="font-bold text-gray-500">Account Status:</span> <span className="font-bold text-green-500">Active</span>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
