import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Parallax} from "react-parallax";
const bg = require('../images/bg.jpeg');

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [thoughts, setThoughts] = useState([]);
    const navigate = useNavigate();
    const [id, setId] = useState('656f34178ad764b984a97719'); // TODO: get this from auth0
    const [user, setUser] = useState(null);


    useEffect(()=>{

        axios.get('/user/' + id)
            .then(success => {
                setUser(success.data)
            })
            .catch(err => {
                return alert("Error happened while retrieving user info : " + err.message)
            })


        axios.get('thought')
            .then(success => {
                setThoughts(success.data);
            })
            .catch(err => {
                return alert('Error happened while retrieving thoughts : ' + err.message);
            })
    }, [])

    return (
        // TODO: scroll partially
        <div className='flex flex-col h-full items-center w-full scroll-smooth' >
            <Parallax className='flex flex-col h-screen items-center w-full' strength={800} bgImage={'http://localhost:4000/uploads/' + user?.background[0]}>
                <div className='flex flex-col items-center w-full h-full'>
                    <div className=' w-auto h-screen flex flex-col items-left justify-center'>
                        <h1 className='bg-[#202020] px-1 py-1 w-7 text-center text-white text-sm'>Of</h1>
                        <h1 onClick={() => navigate('/me/' + user._id)} className='cursor-pointer bg-[#202020] px-6 py-2 leading-9 text-white hover:text-amber-400 duration-500 text-4xl text-center underline'><b>{user?.name}</b></h1>
                    </div>
                </div>
            </Parallax>
            <div className='flex flex-col h-screen items-center w-full bg-[#202020]'>
                <div className='flex flex-col items-center w-full h-screen text-center'>
                    <h1 className='text-white text-2xl mt-28 mb-10 '>
                        <b><i>Thoughts</i></b>
                        <span onClick={()=> navigate('/register')} className='cursor-pointer mx-4 border py-0.5 px-2 text-center hover:text-amber-400 hover:border-amber-400 duration-500'>+</span>
                    </h1>
                    {isLoggedIn && thoughts.length > 0 && thoughts.map(thought => (
                        <div onClick={() => navigate('/thought/'+thought._id)} className='flex flex-col items-center mb-10 text-left gap-2 cursor-pointer border p-8 w-3/5'>
                            <h1 className='text-white text-3xl truncate'><b>{thought.title}</b></h1>
                            <h1 className='text-white text-md'>{thought.created_at.toString()
                                .split('T')[0].replace('-', '/').replace('-', '/')}
                            </h1>
                            <div className=' text-gray-300 w-4/5 text-md line-clamp-3  ' dangerouslySetInnerHTML={{ __html: thought.description }}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}