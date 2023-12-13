import { db } from "@/config/Firebase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/store";
import { useAuth } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

export default function RenameModal() {
  const { userId } = useAuth();

  const [input, setInput] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, fileName] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.fileName,
    ]);

  const renameFile = async () => {
    if (!userId || !fileId) return;

    try {
      await updateDoc(doc(db, "users", userId, "files", fileId), {
        fileName: input,
      }).then(() => {
        setIsRenameModalOpen(false);
        toast.success("Renamed successfully");
      });
    } catch (error) {
      console.log(error);
      setIsRenameModalOpen(false);
      toast.error("Something went wrong" + error);
    }
  };
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-4">Rename the file</DialogTitle>
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") renameFile();
            }}
            defaultValue={fileName!}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogHeader>
        <DialogFooter className="w-full mt-3">
          <div className="flex gap-4 w-full">
            <Button
              onClick={() => setIsRenameModalOpen(false)}
              className="w-full"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button onClick={() => renameFile()} className="w-full">
              Rename
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
