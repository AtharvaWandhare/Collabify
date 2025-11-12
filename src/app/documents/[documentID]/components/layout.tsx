import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
// import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});

export async function generateMetadata(
    { params }: { params: Promise<{ documentID: Id<"documents"> }> }
): Promise<Metadata> {
    try {
        const { documentID } = await params;

        const { getToken } = await auth();
        const token = (await getToken({ template: "convex" })) ?? undefined;

        if (!token) {
            return { title: "Collabify" };
        }

        const doc = await fetchQuery(api.documents.getById, { id: documentID }, { token });
        const title = (doc?.title && doc.title.trim().length > 0) ? doc.title : "Untitled Document";
        return { title: `${title} | Collabify` };
    } catch {
        return { title: "Collabify" };
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}