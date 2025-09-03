import RedirectButton from "@/components/utility/redirect-button";

export default function Home() {

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <RedirectButton href="/documents/new">
          Create New Document
        </RedirectButton>
      </div>
    </>
  );
}