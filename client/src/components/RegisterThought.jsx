import PhotosUploader from "./PhotosUploader";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


export default function RegisterThought() {

    const [addedPhotos, setAddedPhotos] = useState([]);
    const navigate = useNavigate();
    const [descriptionValue, setDescriptionValue] = useState('');
    const type = ['Cinematic', 'Article'];
    const [totalDuration, setTotalDuration] = useState(0);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    // TODO: description value should be reset after changing type
    // useEffect(()=>{
    //     setDescriptionValue('')
    // }, [type])

    const formik = useFormik({
        initialValues: {
            title: '',
            type: type[0],
            description: '',
            photos: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
        }),
        onSubmit: async (values) => {
            await axios.post('/thought', {
                user: '656f34178ad764b984a97719', // TODO: change this to user id
                title: values.title,
                type: values.type,
                description: descriptionValue,
                photos: addedPhotos,
                duration: totalDuration
            }).then(success => {
                navigate('/thought/' + success.data._id)
            }).catch(err => {
                return alert("Error happened : " + err.message);
            })
        }
    })

    return (
        <div className='max-w-2xl min-w-2xl mt-14'>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        {preInput('Title', 'Describe your thought with a title')}
                    </div>
                    <label
                        className={`mt-auto block font-latoBold text-sm ${formik.errors.title ? 'text-red-500' : ""}`}
                        htmlFor='title'>
                        {formik.touched.title && formik.errors.title ? formik.errors.title : ""}
                    </label>
                </div>
                <input
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='title'
                    type='text'
                    placeholder='Title' />

                <div className='flex flex-row items-center justify-between'>
                    <div>
                        {preInput('Type', 'Describe your thought with a type')}
                    </div>
                    <label
                        className={`mt-auto block font-latoBold text-sm ${formik.errors.type ? 'text-red-500' : ""}`}
                        htmlFor='type'>
                        {formik.touched.type && formik.errors.type ? formik.errors.type : ""}
                    </label>
                </div>
                <select
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='type'
                >
                    {type.map(t => {
                        return <option value={t}>{t}</option>
                    })}
                </select>


                { formik.values.type === type[1] && (
                    <>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                {preInput('Description', 'This is the body of post and it will describe the subject')}
                            </div>
                            <label
                                className={`mt-auto block font-latoBold text-sm ${formik.errors.description ? 'text-red-500' : ""}`}
                                htmlFor='description'>
                                {formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                            </label>
                        </div>
                        <ReactQuill
                            className='max-w-xl h-56 max-h-80 mb-10'
                            value={descriptionValue}
                            onChange={(value)=> setDescriptionValue(value)}
                            name='description'
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline'],
                                ]
                            }}
                        />
                    </>
                )}
                { formik.values.type === type[0] && (
                    <>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                {preInput('Description', 'This is the body of post and it will describe the subject')}
                            </div>
                            <label
                                className={`mt-auto block font-latoBold text-sm ${formik.errors.description ? 'text-red-500' : ""}`}
                                htmlFor='description'>
                                {formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                            </label>
                        </div>
                        <textarea
                            value={descriptionValue}
                            onChange={(e)=> setDescriptionValue(e.target.value)}
                            name='description'
                        />
                    </>
                )}
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        {preInput('Photos', 'More is better')}
                    </div>
                    <label
                        className={`mt-auto block font-latoBold text-sm ${formik.errors.photos ? 'text-red-500' : ""}`}
                        htmlFor='photos'>
                        {formik.touched.photos && formik.errors.photos ? formik.errors.photos : ""}
                    </label>
                </div>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} setTotalDuration={setTotalDuration} />

                <div className='flex flex-col items-center mt-8'>
                    <button type='submit' className='w-4/5 py-2 px-8 my-4'><b>Publish Post</b></button>
                </div>
            </form>
        </div>
    )
}