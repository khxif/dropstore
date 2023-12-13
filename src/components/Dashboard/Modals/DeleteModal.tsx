import { db, storage } from "@/config/Firebase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useAuth } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { MouseEvent } from "react";
import { toast } from "sonner";

export default function DeleteModal() {
  const { userId } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId] = useAppStore(
    (state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
    ]
  );

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const imageRef = ref(storage, `users/${userId}/files/${fileId}`);

      await deleteObject(imageRef).then(() => {
        deleteDoc(doc(db, "users", userId!, "files", fileId!));
        setIsDeleteModalOpen(false);
        toast.success("File deleted successfully!");
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong..");
      setIsDeleteModalOpen(false);
    }
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the file
          from our servers.
        </DialogDescription>
        <DialogFooter className="w-full flex">
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full"
            size="lg"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleDelete}
            className="w-full hover:bg-red-800 hover:text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
