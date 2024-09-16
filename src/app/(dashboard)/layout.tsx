import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Menu from "@/components/Menu"
import Navbar from "@/components/Navbar";
import { auth } from '@/auth';


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
  return <div className="h-screen flex">
    {/* Left */}
    <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-screen p-4 overflow-y-auto" >
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start gap-2">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <span className="hidden lg:block">Mwonya A&R</span>
      </Link>
      <Menu />
    </div>
    {/* Right */}
    <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]  h-screen overflow-y-auto">
      <Navbar session={session} />
      <div className="flex-1 overflow-y-auto px-4 mt-4 mb-4">
        {children}
      </div>
    </div>

  </div>;
}
