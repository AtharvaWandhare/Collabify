"use client";
import { toast } from "sonner";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import FullscreenLoader from "@/components/fullscreen-loader";

import { getDocuments, getUsers } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = useMemo(
        () => async () => {
            try {
                const list = await getUsers();
                console.log("Fetched Users:", list);
                setUsers(list);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch users");
            }
        }
        , []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint={async () => {
                const endpoint = "/api/liveblocks-auth";
                const room = params.documentID as string;

                const response = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({ room })
                });

                return await response.json();
            }}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined
                )
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users;
                if (text) {
                    filteredUsers = users.filter((user) =>
                        user.name.toLowerCase().includes(text.toLowerCase())
                    );
                }

                return filteredUsers.map((user) => user.id);
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                const documents = await getDocuments(roomIds as Id<"documents">[]);

                return documents.map((document) => ({
                    id: document.id,
                    name: document.name
                }));
            }}
        >
            <RoomProvider id={`${params.documentID}`} initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}>
                <ClientSideSuspense fallback={<FullscreenLoader label="Room Loading" />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider >
    );
}