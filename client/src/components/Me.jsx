import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import PhotosUploader from "./PhotosUploader";

export default function Me() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState([]);

    useEffect(()=>{
        axios.get('/user/' + id)
            .then(success => {
                setUser(success.data)
                if (success.data.length !== 0)
                    setPhoto(success.data.background)
            })
            .catch(err => {
                return alert("Error happened while retrieving user info : " + err.message)
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            name: user?.name, // this does not set correctly, and on onchange it gets the name. so it needs a change everytime
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: async (values) => {
            // ACCOUNTINFO_001: These if statements are meant to pick only one photo
            // The other way of having background picture is to just use the first photo in HomePage

            // if (photo.length === 1) {
                await axios.put('/user/' + id, {
                    name: values.name,
                    background: photo,
                }).then(success => {
                    navigate('/')
                    return alert("Your account info is updated");
                }).catch(err => {
                    return alert("Error happened while updating user info: " + err.message);
                })
            // } else
            //     alert("You could upload only one photo for background")
        }
    })


    return (
        <div className='flex flex-col gap-2 items-start p-10 mt-36'>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h2 className='text-2xl mt-4'>Name</h2>
                    </div>
                    <label
                        className={`mt-auto block font-latoBold text-sm ${formik.errors.name ? 'text-red-500' : ""}`}
                        htmlFor='title'>
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                    </label>
                </div>
                <input
                    className='text-2xl mb-8'
                    value={formik.values.name ? formik.values.name : user?.name }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='name'
                    type='text'
                    placeholder='Name' />

                <PhotosUploader addedPhotos={photo} onChange={setPhoto} />
                <div className='flex flex-col items-center mt-8'>
                    <button type="submit" className='w-4/5 bg-amber-400 py-2 px-8 my-4 text-black'><b>Update</b></button>
                </div>
            </form>
        </div>
    )
}