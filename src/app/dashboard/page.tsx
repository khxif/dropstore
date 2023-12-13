import DragAndDrop from "@/components/Dashboard/DragAndDrop";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";
import { db } from "../../config/Firebase";
import TableWrapper from "@/components/Table/TableWrapper";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const files = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = files.docs.map((file) => ({
    id: file.id,
    fileName: file.data().fileName || file.id,
    fullName: file.data().fullName,
    size: file.data().size,
    type: file.data().type,
    profileImage: file.data().profileImage,
    timestamp: new Date(file.data().timestamp.seconds * 1000) || undefined,
    downloadURL: file.data().downloadURL,
  }));

  return (
    <main>
      <DragAndDrop />
      <div className="px-1 sm:px-2 md:container mx-auto space-y-5 mt-2 md:mt-4 mb-6">
        <h1 className="font-bold text-lg">All Files</h1>
        <TableWrapper userId={userId} skeletonFiles={skeletonFiles} />
      </div>
    </main>
  );
}
