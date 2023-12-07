import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Parallax} from "react-parallax";
const bg = require('../images/bg.jpeg');

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [thoughts, setThoughts] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get('thought')
            .then(success => {
                setThoughts(success.data);
            })
            .catch(err => {
                // return alert('Error happened while retrieving thoughts : ' + err.message);
            })
    }, [])

    return (
        // <Parallax className='flex flex-col h-full items-center w-full' strength={300} bgImage={bg} >
        // padding ruined thoughts section
        // TODO: scroll partially
        <div className='flex flex-col h-full items-center w-full scroll-smooth' >
            <div className='flex flex-col h-screen items-center w-full'>
                <div className='flex flex-col items-center w-full h-full'>
                    <div className=' w-auto mt-80 '>
                        <h1 className='bg-[#202020] px-1 py-1 w-7 text-center text-white text-sm'>Of</h1>
                        <h1 className='bg-[#202020] px-6 py-2 leading-9 text-white text-4xl text-center underline'><b>Mahdi Hadian</b></h1>
                    </div>
                    {/*    TODO: add a text */}
                </div>
            </div>
            <div className='flex flex-col h-screen items-center w-full bg-[#202020]'>
                <div className='flex flex-col items-center w-full h-screen'>
                    <h1 className='text-white text-2xl mt-28 mb-10 underline'>
                        <b><i>Thoughts</i></b>
                    </h1>
                    {isLoggedIn && thoughts.length > 0 && thoughts.map(thought => (
                        <div onClick={() => navigate('/thought/'+thought._id)} className='flex flex-col mb-10 text-left gap-2 cursor-pointer border p-8'>
                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-white text-2xl truncate'><b>{thought.title}</b></h1>
                                <h1 className='text-white text-md'>{thought.created_at.toString()
                                    .split('T')[0].replace('-', '/').replace('-', '/')}
                                </h1>
                            </div>
                            <h1 className='text-gray-300 w-80 text-sm line-clamp-3 max-h-20 '>{thought.description}</h1>

                            {/*TODO: make it random objects on bottom border left or right*/}
                            {/*<hr className='' />*/}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}