import PhotosUploader from "./PhotosUploader";
import {useState} from "react";
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
            color: '',
            description: '',
            photos: [],
            tags: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            color: Yup.string().required('Color is required'),
            // description: Yup.string().required('Description is required'),
            // TODO: validation for arrays Photos and Tags
        }),
        onSubmit: async (values) => {
            await axios.post('/thought', {
                user: '656f34178ad764b984a97719', // TODO: change this to user id
                title: values.title,
                color: values.color,
                description: descriptionValue,
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
                        {preInput('Color', 'Categorize your thoughts by picking colors')}
                    </div>
                    <label
                        className={`mt-auto block font-latoBold text-sm ${formik.errors.color ? 'text-red-500' : ""}`}
                        htmlFor='color'>
                        {formik.touched.color && formik.errors.color ? formik.errors.color : ""}
                    </label>
                </div>
                <input
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='color'
                    type='text'
                    placeholder='Color' />

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

                <div className='flex flex-col items-center mt-8'>
                    <button className='w-4/5 py-2 px-8 my-4'><b>Publish Post</b></button>
                </div>
            </form>
        </div>
    )
}