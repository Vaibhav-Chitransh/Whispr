import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ShowProfile({ open, onOpenChange, user }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <DialogTitle className='font-bold text-xl'>{user.fullName}</DialogTitle>
            <DialogDescription>{user.bio}</DialogDescription>
          </div>

          <div>
            <img
              src={user.profilePic || "/default_image.avif"}
              alt={user.fullName}
              className="h-60 w-60 rounded-full border-2 border-gray-700"
            />
          </div>

          <div className="flex flex-col gap-2 items-between justify-center w-full">
          <p className="text-gray-500 border-b mb-3 flex justify-between">
              <span className="font-bold">Member Since</span> <span>{new Date(user.createdAt).toLocaleTimeString()}</span> <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-500 border-b mb-3 flex justify-between">
              <span className="font-bold">Last Updated</span> <span>{new Date(user.updatedAt).toLocaleTimeString()}</span><span>{new Date(user.updatedAt).toLocaleDateString()}</span>
            </p>
            <p className='flex justify-between'>
              <span className="font-bold text-gray-500">Account Status:</span> <span className="font-bold text-green-500">Active</span>
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
