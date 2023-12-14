"use client";

import { db } from "@/config/Firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { columns } from "./Columns";
import { DataTable } from "./Datat/Table";

type Props = {
  skeletonFiles: FileType[];
  userId: string;
};

export default function TableWrapper({ skeletonFiles, userId }: Props) {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);

  const [docs, loading, error] = useCollection(
    query(collection(db, "users", userId!, "files"), orderBy("timestamp", sort))
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] | undefined = docs?.docs.map((file) => ({
      id: file.id,
      fileName: file.data().fileName || file.id,
      fullName: file.data().fullName,
      size: file.data().size,
      type: file.data().type,
      profileImage: file.data().profileImage,
      timestamp: new Date(file.data()?.timestamp?.seconds * 1000) || undefined,
      downloadURL: file.data().downloadURL,
    }));
    setInitialFiles(files);
  }, [docs]);

  return (
    <div className="w-full flex flex-col">
      <Button
        onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        className="mb-5 ml-auto justify-end mr-3 md:mr-0"
      >
        {loading ? (
          <Skeleton className="h-4 w-20 rounded-md bg-slate-400" />
        ) : (
          <>Sort by ({sort === "asc" ? "Newest" : "Oldest"})</>
        )}
      </Button>
      <DataTable
        loading={loading}
        skeletonFiles={skeletonFiles}
        columns={columns}
        data={initialFiles}
      />
    </div>
  );
}
