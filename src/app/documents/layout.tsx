

interface DocumentLayoutProps {
    children: React.ReactNode
}

export default function DocumentLayout({ children }: DocumentLayoutProps) {
    return (
        <div className="">
            {children}
        </div>
    );
}