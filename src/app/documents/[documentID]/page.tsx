import { BsWrenchAdjustable } from "react-icons/bs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs"

interface DocumentIdPageProps {
    params: Promise<{ documentID: Id<"documents"> }>
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
    const { documentID } = await params;

    console.log("DocumentIdPage received documentID:", documentID);

    const { getToken } = await auth();
    const token = await getToken({ template: "convex" }) ?? undefined;

    if (!token) {
        throw new Error("Unauthorized")
    }

    const preloadedDocument = await preloadQuery(
        api.documents.getById,
        { id: documentID },
        { token }
    );

    if (!preloadedDocument) {
        throw new Error("Document not found");
    }

    return (
        <>
            <Document preloadedDocument={preloadedDocument} />
        </>
    );
}