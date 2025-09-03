// interface DocumentIdPageProps {
//     params: Promise<{ documentId: string }>
// };

import Editor from "@/app/documents/[documentID]/editor";
import Toolbar from "@/app/documents/[documentID]/toolbar";
import { Navbar } from "@/app/documents/[documentID]/navbar";

export default function DocumentIdPage() {
    return (
        <>
            <div className="min-h-screen bg-[#FAFBFD]">
                <Navbar />
                <Toolbar />
                <Editor />
            </div>
        </>
    );
}