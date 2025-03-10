import axios from "axios";
import {useState} from "react";

export default function PhotosUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        if (photoLink == null || photoLink === '') {
            return alert('Link is required')
        }

        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink});
        onChange(prev => {
            return [...prev, filename];
        })
        console.log(filename)
        setPhotoLink('')
    }

    function handleUploadPhoto(e) {
        const files =  e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(response => {
            const {data: filenames} = response;
            onChange(prev => {
                return [...prev, ...filenames];
            })
        })
    }

    function removePhoto(e, filename) {
        e.preventDefault()
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    function setMainPhoto(e, filename) {
        e.preventDefault();
        const newAddedPhotos = [filename, ...addedPhotos.filter(photo => photo !== filename)]
        onChange(newAddedPhotos);
    }

    return (
        <>
            <div className='flex gap-2'>
                <input value={photoLink} onChange={e => setPhotoLink(e.target.value)} type='text' placeholder='Add using a link ...jpg' />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 '>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid items-center grid-cols-3 gap-2'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='h-32 w-48 flex relative' key={link}>
                        <img className=' w-full object-cover' src={'http://localhost:4000/uploads/' + link} alt='image' />
                        <button onClick={(e) => removePhoto(e, link)} className=' cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-70  py-2 px-3 m-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={(e) => setMainPhoto(e, link)} className=' cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-70 py-2 px-3 m-2'>
                            {link === addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>

                            )}
                            {link !== addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            )}

                        </button>
                    </div>
                ))}
                <label className='h-32 w-48 cursor-pointer flex items-center gap-1 justify-center border bg-transparent  p-8 text-gray-600'>
                    <input multiple type='file' className='hidden' onChange={handleUploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    Upload
                </label>
            </div>
        </>

)
}