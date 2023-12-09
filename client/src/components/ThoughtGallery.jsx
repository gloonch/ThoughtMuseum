import {useState} from "react";

export default function ThoughtGallery({thought, col}) {

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white text-left min-w-full min-h-screen mt-8 z-20'>
                <div className=' bg-black p-8 grid gap-4'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {thought.title}</h2>
                        <button onClick={()=> setShowAllPhotos(false)} className='fixed right-12 top-8 flex gap-2 mt-8 py-2 px-4 bg-white text-black shadow shadow-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {thought?.photos?.length > 0 && thought.photos.map(photo => (
                        <div key={photo}>
                            <img className='w-full' src={'http://localhost:4000/uploads/' + photo} alt='' />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='relative'>
            <div className='grid gap-0.5 grid-cols-[1fr_1fr_1fr] overflow-hidden'>
                {thought.photos  && thought.photos.map(photo => (
                    <div key={photo} className={col}>
                        <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/' + photo} alt={''} />
                    </div>
                ))}
            </div>
        </div>
    )
}