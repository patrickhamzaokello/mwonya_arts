import Link from "next/link";
import Image from "next/image";
import { FileUp } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"


const Navbar = ({ session }: any) => {
    return (
        <div className='flex items-center justify-between py-4 px-4 bg-white mb-6'>
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src="/search.png" alt="" width={14} height={14} />
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />

            </div>
            <div className="flex items-center gap-6 justify-end w-full">
                <div>
                    <Link className={buttonVariants({ variant: "outline" })} href={"/upload"}> <FileUp className="mr-2 h-4 w-4" />Upload</Link>

                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <Image src="/message.png" alt="" width={20} height={20} />

                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                    <Image src="/announcement.png" alt="" width={20} height={20} />
                    <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>

                </div>

                {
                    session?.user ? (
                        <>
                            <div className="flex flex-col">
                                <span className="text-xs leading-3 font-medium">{session.user.name}</span>
                                <span className="text-[10px] text-gray-500 text-right">Record Label</span>
                            </div>
                            {
                                session.user.name && session.user.image &&

                                <Image className="rounded-full"
                                    src={session.user.image}
                                    alt={session.user.name}
                                    width={36}
                                    height={36}
                                />
                            }

                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <span className="text-xs leading-3 font-medium">User</span>
                                <span className="text-[10px] text-gray-500 text-right">Role</span>
                            </div>
                            <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full" />
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Navbar