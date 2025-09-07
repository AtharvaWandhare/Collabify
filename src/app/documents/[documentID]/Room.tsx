"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {

    const params = useParams();

    return (
        <LiveblocksProvider publicApiKey={"pk_dev__GpUdV4u7co05mitrPYfPiBx3t35ukgYjnEtVHeGaqhH8iVa0mIN-j46ZFdscPU5"}>
            <RoomProvider id={`${params.documentID}`}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}