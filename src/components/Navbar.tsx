"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { FileUp, ChevronDown, Plus } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useArtist } from "@/contexts/ArtistContext"

import { useRouter } from 'next/navigation'

interface Artist {
    id: string;
    name: string;
    image: string;
}

const Navbar = ({ session }: any) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useArtist();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await fetch('/api/artists'); // Replace with your actual API endpoint
            const data = await response.json();
            setArtists(data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const handleSelectArtist = (artistId: string) => {
        setSelectedArtist(artistId);
        setIsOpen(false);
        if (artistId == 'add-new') {

            router.push('/add-artist')
        } else {

            router.push('/studio')
        }
    };



    return (
        <div className='flex items-center justify-between py-4 px-4 bg-white'>
            <div className="relative">
                <Select onValueChange={handleSelectArtist} value={selectedArtist || undefined}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Artist" />
                    </SelectTrigger>
                    <SelectContent>
                        {artists.map((artist) => (
                            <div key={artist.id} className='flex items-center justify-center'>
                                <Image className="mr-0 h-4 w-4 ml-2 rounded-full" src={artist.image} alt="" width={25} height={25} />
                                <SelectItem key={artist.id} value={artist.id}>
                                    {artist.name}
                                </SelectItem>
                            </div>

                        ))}
                        <SelectItem value="add-new" className="mt-2 border-1 pt-2">
                            <span className="flex items-center text-blue-500">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Artist
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-6 justify-end w-full">
                <div>
                    <Link className={buttonVariants({ variant: "outline" })} href={"/upload"}> <FileUp className="mr-2 h-4 w-4" />New Release</Link>
                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <Image src="/message.png" alt="" width={20} height={20} />
                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                    <Image src="/announcement.png" alt="" width={20} height={20} />
                    <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
                </div>

                {session?.user ? (
                    <>
                        <div className="flex flex-col">
                            <span className="text-xs leading-3 font-medium">{session.user.name}</span>
                            <span className="text-[10px] text-gray-500 text-right">Record Label</span>
                        </div>
                        {session.user.name && session.user.image && (
                            <Image className="rounded-full"
                                src={session.user.image}
                                alt={session.user.name}
                                width={36}
                                height={36}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <span className="text-xs leading-3 font-medium">User</span>
                            <span className="text-[10px] text-gray-500 text-right">Role</span>
                        </div>
                        <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full" />
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar