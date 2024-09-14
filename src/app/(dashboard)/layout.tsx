import  Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Menu from "@/components/Menu"
import Navbar  from "@/components/Navbar";
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
    return   <div className="h-screen flex">
       {/* Left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4" >
        <Link 
        href="/" 
        className="flex items-center justify-center lg:justify-start justify-start gap-2">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <span className="hidden lg:block">Mwonya A&R</span>
        </Link>
        <Menu/>
      </div>
      {/* Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]">
      <Navbar session={session}/>
        {children}
      </div>
      
      </div>;
  }
  