"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface RedirectButtonProps {
    children: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    href: string;
}

export default function RedirectButton({ children, variant = "default", href }: RedirectButtonProps) {
    const router = useRouter();

    return (
        <Button className="cursor-pointer" variant={variant} onClick={() => { router.push(href); }}>
            {children}
        </Button>
    );
}