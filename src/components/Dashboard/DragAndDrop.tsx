"use client";

import { db, storage } from "@/config/Firebase";
import { useUser } from "@clerk/nextjs";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import prettyBytes from "pretty-bytes";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

export default function DragAndDrop() {
  const maxSize = 20971520;
  const { user } = useUser();

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (file: File) => {
    if (!user || !file) return;

    try {
      const docRef = await addDoc(collection(db, "users", user?.id!, "files"), {
        userId: user?.id,
        fileName: file.name,
        fullName: user?.fullName,
        size: prettyBytes(file.size),
        type: file.type,
        profileImage: user?.imageUrl,
        timestamp: serverTimestamp(),
      });

      const imagesRef = await ref(
        storage,
        `users/${user.id}/files/${docRef.id}`
      );
      uploadBytes(imagesRef, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imagesRef);
        await updateDoc(doc(db, "users", user.id!, "files", docRef.id!), {
          downloadURL,
        });
      });

      toast.success("File uploaded");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dropzone maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
        isDragReject,
      }) => {
        // console.log(fileRejections);

        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > 2;

        fileRejections.length > 0 &&
          toast.error(fileRejections[0].errors[0].message);

        return (
          <section className="flex items-center px-4 py-2 mx-auto justify-center">
            <div
              {...getRootProps()}
              className={` w-full h-60 text-center flex items-center justify-center
             ${
               isDragActive
                 ? "bg-blue-600 text-white animate-pulse"
                 : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-400"
             }`}
            >
              <input {...getInputProps()} />
              {!isDragActive && <p>Click here or Drag files to upload!</p>}
              {isDragActive && !isDragReject && <p>Drop here to upload!</p>}
              {isFileTooLarge && (
                <p className="text-red-800 ml-2">File too large!</p>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}
