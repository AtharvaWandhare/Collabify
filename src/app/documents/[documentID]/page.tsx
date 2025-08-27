// interface DocumentIdPageProps {
//     params: Promise<{ documentId: string }>
// };

import Toolbar from "@/app/documents/[documentID]/editor";
import Editor from "@/app/documents/[documentID]/toolbar";

export default function DocumentIdPage() {
    return (
        <>
            <div className="min-h-screen bg-[#FAFBFD]">
                <Editor />
                <Toolbar />
            </div>
        </>
    );
}