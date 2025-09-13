"use client";
import React, { JSX, useRef, useState } from "react"
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
    title: string;
    id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps): JSX.Element => {

    const status = useStatus();

    const [value, setValue] = useState(title);
    const [isPending, setIsPending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const mutate = useMutation(api.documents.updateById);

    const debouncedUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return;

        setIsPending(true);
        mutate({ id, title: newValue })
            .then(() => toast.success("Document Updated"))
            .catch(() => toast.error("Failed to update document title"))
            .finally(() => setIsPending(false));
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(true);
        mutate({ id, title: value })
            .then(() => toast.success("Document Updated"))
            .catch(() => toast.error("Failed to update document title"))
            .finally(() => {
                setIsPending(false);
                setIsEditing(false);
            });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedUpdate(newValue);
    }

    const showLoader = isPending || status === "connecting" || status === "reconnecting";
    const showError = status === "disconnected";

    return (
        <>
            {isEditing ? (
                <>
                    <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
                        <span className="invisible whitespace-pre px-1.5 text-lg">
                            {value || " "}
                        </span>
                        <input
                            id="document-title"
                            type="text"
                            onBlur={() => setIsEditing(false)}
                            ref={inputRef}
                            value={value}
                            onChange={onChange}
                            className="absolute inset-0 text-lg text-black px-1.5 truncate"
                        />
                    </form>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-lg px-1.5 cursor-pointer"
                            onClick={() => {
                                setIsEditing(true);
                                setTimeout(() => {
                                    inputRef.current?.focus();
                                }, 10);
                            }}
                        >
                            {title || "Untitled Document"}
                        </span>
                        {showError && <BsCloudSlash className="size-4" />}
                        {!showError && !showLoader && (<BsCloudCheck className="size-4" />)}
                        {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground" />}
                    </div>
                </>
            )}
        </>
    )
}