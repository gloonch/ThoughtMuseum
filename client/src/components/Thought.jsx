import {useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState} from "react";
import axios from "axios";
import ThoughtGallery from "./ThoughtGallery";
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from "react-quill";
import {motion} from "framer-motion";

export default function Thought() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [thought, setThought] = useState(null);
    const [isTitleClicked, setIsTitleClicked] = useState(false);
    const [cols, setCols] = useState('');
    const [scrollingSpeed, setScrollingSpeed] = useState(0);
    const [countdown, setCountdown] = useState(20);
    const [description, setDescription] = useState('');
    const [type, setType] = useState("Article");
    const [currentState, setCurrentState] = useState(0);
    const [duration, setDuration] = useState(10000); // first one should be an intro or waiting for title

    useEffect(()=>{
        axios.get('thought/' + id)
            .then(success => {
                setThought(success.data);
                setDescription(success.data.description)
                setType(success.data.type)
            })
            .catch(err => {
                return alert("Error happened while retrieving thought : " + err.message)
            })
    }, [])

    if (type === 'Cinematic') {
        setTimeout(() => {
            if (currentState === thought.photos.length) {
                setCurrentState(0)
            }
            else {
                setCurrentState(currentState + 1)
            }
        }, duration)
    }

    function nextMedia(index) {
        let ext;
        if (thought.photos[index])
            ext = thought.photos[index].split('.')[1];

        if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
            return (
                <div key={index}>
                    {/*TODO: put smooth zoom effect on images*/}
                    <motion.img
                        initial={{opacity: 0}}
                        animate={{opacity: [0, 1.01]}}
                        exit={{opacity: 0}}
                        onLoad={() => {
                            setDuration(5000);
                        }}
                        className='w-full'
                        src={'http://localhost:4000/uploads/' + thought.photos[index]}
                        alt='' />
                </div>
            )
        }

        if (ext === 'mp4' || ext === 'MOV') {
            return (
                <div key={index}>
                    <motion.video
                        initial={{opacity: 0}}
                        animate={{opacity: [0, 1.01]}}
                        exit={{opacity: 0}}
                        key={index}
                        transition={{duration: 2}}
                        onCanPlay={(e) => {
                            setDuration(Math.round(e.target.duration, 1000 ) * 1000);
                        }}
                        className='w-full h-screen object-cover'
                        src={'http://localhost:4000/uploads/' + thought.photos[index]}
                        autoPlay
                    />
                </div>
            )
        }
    }

    return (
        <div className=' w-full bg-black'>
            {thought && thought.type === 'Article' && (
                <div className='flex flex-row justify-around items-start mt-6 p-6'>
                    <div className='flex flex-col mt-10 items-start pr-3 w-full '>
                        <h1 onClick={()=> {setIsTitleClicked(!isTitleClicked)}} className={'font-oswald cursor-pointer text-white text-8xl mb-8 line-clamp-4 -mr-96 tracking-tight opacity-70 z-10 font-bold bg-yellow-600'}>{thought.title}</h1>
                        {!isTitleClicked && (

                            <ReactQuill className='text-gray-700 text-xl font-playfair'
                                value={thought.description}
                                readOnly={true}
                                theme={"bubble"}
                            />
                            // <div className=' font-playfair' dangerouslySetInnerHTML={{ __html: description }}/>

                        )}
                        {isTitleClicked && (
                            <div className='w-full border bg-[#202020] p-8'>
                                <h1 className='text-3xl text-white'>Thought Setting</h1>

                                {/* Photo cols */}
                                <h1 className='text-xl mt-8 text-white'>Show photos in:</h1>
                                <div className="w-full flex gap-5">
                                    <div onClick={()=> setCols('col-span-3')} className="inline-flex items-center">
                                        <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="oneCol">
                                            <input onClick={()=> setCols('col-span-3')}
                                                   name="type"
                                                   type="radio"
                                                   className="text-white before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border border-blue-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-white before:opacity-0 before:transition-opacity checked:border-white checked:before:bg-white hover:before:opacity-10"
                                                   id="oneCol" />
                                            <span
                                                className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                              </span>
                                        </label>
                                        <label className="mt-px font-light text-white cursor-pointer select-none" htmlFor="oneCol">
                                            One Column
                                        </label>
                                    </div>
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="threeCol">
                                            <input onClick={()=> setCols('col-span-1')}
                                                   name="type"
                                                   type="radio"
                                                   className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border border-blue-white text-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-white before:opacity-0 before:transition-opacity checked:border-white checked:before:bg-white hover:before:opacity-10"
                                                   id="threeCol" checked />
                                            <span
                                                className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                                  </span>
                                        </label>
                                        <label className="mt-px font-light text-white cursor-pointer select-none" htmlFor="threeCol">
                                            Three Columns
                                        </label>
                                    </div>
                                </div>

                                {/* Auto scroll setting */}
                                <div className='w-full flex gap-8 mt-8'>
                                    <div className='flex flex-col'>
                                        <h1 className='text-xl  text-white'>Scrolling speed:</h1>
                                        <input
                                            value={scrollingSpeed}
                                            onChange={(e)=>setScrollingSpeed(e.target.value)}
                                            name='scrollspeed'
                                            type='number'
                                            placeholder='Speed' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='text-xl text-white'>Scrolling start time:</h1>
                                        <input
                                            value={countdown}
                                            onChange={(e)=>setCountdown(e.target.value)}
                                            name='countdown'
                                            type='number'
                                            min={20}
                                            placeholder='Countdown' />
                                    </div>

                                </div>


                            </div>
                        )}
                    </div>
                    <div className=' w-full'>
                        <ThoughtGallery thought={thought} col={cols} />
                    </div>
                </div>
            )}

            {thought && thought.type === 'Cinematic' && (
                <div className='w-full h-screen' key={currentState}>
                    {/*TODO: opacity applies after a few seconds and that's a problem */}
                    {/*<div className='overlay absolute top-0 left-0 w-full h-full bg-black opacity-20 '>*/}
                    {/*</div>*/}

                    {nextMedia(currentState)}
                    <div className='content absolute w-full h-screen top-0 flex flex-col gap-2 justify-center items-center text-white text-center' >
                        <h1 className='text-6xl'>{thought.title}</h1>
                        <p className='text-xl  w-808 '>{thought.description}</p>
                    </div>
                </div>
            )}

        </div>
    )
}