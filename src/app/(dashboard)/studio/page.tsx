"use client"
import { useArtist } from "@/contexts/ArtistContext";

const ArtistStudio = () => {
  const [selectedArtist, setSelectedArtist] = useArtist();
  return (
    <div className=''>
      <h2>Selected Artist: {selectedArtist || 'None'}</h2>
      <div>
        Mwonya Studio
      </div>
    </div>
  );
};

export default ArtistStudio;