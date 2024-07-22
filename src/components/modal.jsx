import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

Modal.setAppElement('#__next');

const ModalComponent = ({ isOpen, onRequestClose, onSubmit }) => {
    const [pictureURL, setPictureURL] = useState('');

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            jobTitle: '',
            aboutMe: '',
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            picture: null
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('First name is required'),
            lastname: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            aboutMe: Yup.string().required('About Me is required')
        }),
        onSubmit: async (values) => {
            const formDataToSend = new FormData();
            for (const key in values) {
                formDataToSend.append(key, values[key]);
            }

            try {
                await axios.post("https://baseball-backend.onrender.com/insert/", formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onSubmit();
            } catch (error) {
                console.error('Error submitting the form:', error);
            }

            // Close the modal after submission
            onRequestClose(); 
        }
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('picture', file);
            const objectURL = URL.createObjectURL(file);
            setPictureURL(objectURL);
        }
    };

    const handleCloseModal = () => {
        formik.resetForm(); // Reset the form
        setPictureURL(''); // Clear the picture preview
        onRequestClose(); // Close the modal
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <div className="avatar-upload" onClick={() => document.getElementById('avatar').click()}>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                    {pictureURL ? (
                        <img src={pictureURL} alt="Avatar" />
                    ) : (
                        <div className="upload-icon">
                            <FaUpload />
                        </div>
                    )}
                </div>
                <div className="form_container" onSubmit={formik.handleSubmit}>
                    <div className="form_control">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Martin'
                        />
                        {formik.touched.firstname && formik.errors.firstname ? (
                            <div className={`error ${formik.touched.firstname && formik.errors.firstname ? 'error-show' : ''}`}>
                                {formik.errors.firstname}
                            </div>
                        ) : null}
                    </div>
                    <div className="form_control">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Chavez'
                        />
                        {formik.touched.lastname && formik.errors.lastname ? (
                            <div className={`error ${formik.touched.lastname && formik.errors.lastname ? 'error-show' : ''}`}>
                                {formik.errors.lastname}
                            </div>
                        ) : null}
                    </div>
                    <div className="form_control">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='example@gmail.com'
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={`error ${formik.touched.email && formik.errors.email ? 'error-show' : ''}`}>
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="form_control">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formik.values.jobTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Developer'
                        />
                    </div>
                    <div className="textarea_control">
                        <label htmlFor="aboutMe">About Me</label>
                        <textarea
                            id="aboutMe"
                            name="aboutMe"
                            value={formik.values.aboutMe}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Tell us a bit about yourself...'
                        />
                        {formik.touched.aboutMe && formik.errors.aboutMe ? (
                            <div className={`error ${formik.touched.aboutMe && formik.errors.aboutMe ? 'error-show' : ''}`}>
                                {formik.errors.aboutMe}
                            </div>
                        ) : null}
                    </div>
                    <div className="form_control">
                        <label htmlFor="twitter">Twitter</label>
                        <input
                            type="text"
                            id="twitter"
                            name="twitter"
                            value={formik.values.twitter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Username'
                        />
                    </div>
                    <div className="form_control">
                        <label htmlFor="facebook">Facebook</label>
                        <input
                            type="text"
                            id="facebook"
                            name="facebook"
                            value={formik.values.facebook}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Username'
                        />
                    </div>
                    <div className="form_control">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            value={formik.values.instagram}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Username'
                        />
                    </div>
                    <div className="form_control">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            value={formik.values.linkedin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Username'
                        />
                    </div>
                </div>
                <div className="button_container">
                    <button type="submit" disabled={!formik.isValid || formik.isSubmitting || !formik.dirty} onClick={formik.handleSubmit}>Submit</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalComponent;
