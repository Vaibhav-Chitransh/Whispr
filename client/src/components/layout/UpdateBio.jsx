import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userStore } from "@/store/userStore";
import { useState } from "react";

export function UpdateBio() {
    const {user, updateProfile} = userStore();
    const [bio, setBio] = useState(user.bio || "Available");

  const handleBioChange = async () => {
    await updateProfile({bio: bio});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Bio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bio</DialogTitle>
          <DialogDescription>
            Make changes to your Bio here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Bio
          </Label>
          <Input id="bio" value={bio} className="col-span-3" onChange={(e) => setBio(e.target.value)} />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBioChange}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
