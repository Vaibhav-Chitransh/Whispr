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
import { useChatStore } from "@/store/useChatStore";
import { userStore } from "@/store/userStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import {createGroup} from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export function MakeGroup() {
  const { users } = useChatStore();
  const { user } = userStore();
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([user._id]);

  const handleSelectUser = (e, u) => {
    if (e.target.checked)
      setSelectedUsers((prevUsers) => [...prevUsers, u._id]);
    else
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((id) => id !== u._id)
      );

    console.log(selectedUsers);
  };

  const handleCreateGroup = async () => {
    if(!groupName) {
      toast.error("Please enter group name");
      return ;
    }
    if(selectedUsers.length <= 1) {
      toast.error("You must select at least 2 users to create a group");
      return ;
    }
    try {
      const res = await createGroup({
        name: groupName,
        members: [...selectedUsers, user._id]
      })

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Create a new group chat with your friends.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Group Name
            </Label>
            <Input
              id="name"
              value={groupName}
              required={true}
              className="col-span-3"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="members" className="text-right mb-4">
              Members
            </Label>
            <div className="flex flex-col gap-1 mt-2">
              {users.map((u) => (
                <div key={u._id} className="flex gap-2">
                  <input
                    type="checkbox"
                    id={u._id}
                    value={u._id}
                    onChange={(e) => handleSelectUser(e, u)}
                    className="cursor-pointer"
                  />
                  <span>{u.fullName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateGroup}>Create Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
