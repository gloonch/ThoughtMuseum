import PhotosUploader from "./PhotosUploader";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function RegisterThought() {

    const [addedPhotos, setAddedPhotos] = useState([]);
    const navigate = useNavigate();

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

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            photos: [],
            tags: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            // TODO: validation for arrays Photos and Tags
        }),
        onSubmit: async (values) => {
            await axios.post('/thought', {
                user: '656f34178ad764b984a97719', // TODO: change this to user id
                title: values.title,
                description: values.description,
                photos: addedPhotos,
                tags: []
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
                        {preInput('Description', 'This is the body of post and it will describe the subject')}
                    </div>
                    <label
                        className={`mt-auto block font-latoBold text-sm ${formik.errors.description ? 'text-red-500' : ""}`}
                        htmlFor='description'>
                        {formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                    </label>
                </div>
                <textarea
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='description'
                />

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
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <div className='flex flex-col mt-8'>
                    <button className='bg-amber-400 py-2 px-8 my-4 rounded-2xl text-black'><b>Publish Post</b></button>
                </div>
            </form>
        </div>
    )
}