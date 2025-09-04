import RedirectButton from "@/components/utility/redirect-button";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./template-gallery";

export default function Home() {

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
          <Navbar />
        </div>

        <div className="mt-16">
          <TemplatesGallery />
        </div>
      </div>
    </>
  );
}