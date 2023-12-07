import {useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    return (
        // TODO: it should be changed to users name after scrolling to middle page
        <div className='fixed bg-black text-center w-full items-left top-0 z-10 p-2 under'>
            <h1 onClick={()=> navigate('/')} className='text-2xl text-white cursor-pointer leading-9 underline'><b>ThoughtMuseum</b></h1>
        </div>
    )
}