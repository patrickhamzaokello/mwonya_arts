import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Menu from "@/components/Menu"
import Navbar from "@/components/Navbar";
import { auth, signOut } from '@/auth';
import { ArtistProvider } from "@/contexts/ArtistContext";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  //redirect if session is null
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <ArtistProvider>
      <div className="h-screen flex">
        {/* Left Sidebar */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-screen p-4 fixed top-0 left-0 overflow-y-auto bg-white z-10">
          <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block">Mwonya A&R</span>
          </Link>
          <Menu />
        </div>

        {/* Right Section */}
        <div className="ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] h-screen flex flex-col bg-[#F7F8FA]">
          {/* Top Navbar */}
          <div className="fixed top-0 left-0 right-0 h-[60px] z-20 bg-white  ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%]">
            <Navbar session={session} />
          </div>

          {/* Main Content Section */}
          <div className="flex-1 overflow-y-auto mt-[60px] p-4">
            {/* Main dashboard section to scroll */}
            {children}
          </div>
        </div>
      </div>

    </ArtistProvider>
  );


}
