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
            // try {
            //     const list = await getUsers();
            //     setUsers(list);
            // } catch (_) {
            //     toast.error("Failed to fetch users");
            // }
            await getUsers()
                .then((list) => setUsers(list))
                .catch(() => toast.error("Failed to fetch users"));
        }
        , []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const getColorForUser = (name: string) => {
        const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const color = `hsl(${nameToNumber % 360}, 100%, 75%)`;
        return color;
    };

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
            resolveUsers={async ({ userIds }) => {
                return userIds.map((userId) => {
                    const user = users.find((u) => u.id === userId);
                    return user
                        ? { name: user.name, avatar: user.avatar, color: getColorForUser(user.name) }
                        : undefined;
                });
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