"use client";
import { BellIcon } from "lucide-react";
import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Inbox = () => {
    return (
        <>
            <ClientSideSuspense fallback={
                <>
                    <Button disabled className="relative" variant="ghost" size={"icon"}>
                        <BellIcon className="h-5 w-5" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1 min-h-6 bg-neutral-200" />
                </>
            }>
                <InboxMenu />
            </ClientSideSuspense>
        </>
    )
}

const InboxMenu = () => {
    const { inboxNotifications } = useInboxNotifications();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="relative" variant="ghost" size={"icon"}>
                        <BellIcon className="h-5 w-5" />
                        {inboxNotifications?.length > 0 && (
                            <>
                                <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
                                    {inboxNotifications.length}
                                </span>
                            </>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-auto">
                    {inboxNotifications.length > 0 ? (
                        <>
                            <InboxNotificationList>
                                {inboxNotifications.map((notification) => (
                                    <InboxNotification
                                        key={notification.id}
                                        inboxNotification={notification}
                                        showActions={true}
                                    />
                                ))}
                            </InboxNotificationList>
                        </>
                    ) : (
                        <>
                            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
                                No new notifications
                            </div>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="mx-1 min-h-6 bg-neutral-200" />
        </>
    )
}