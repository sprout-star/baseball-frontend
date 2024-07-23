import React, { useState, useEffect } from "react";
import ModalComponent from '../components/modal';
import { useRouter } from "next/router";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner
import plusImage from '../styles/plus.png';
import Image from 'next/image';

export default function App() {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('//localhost:3000/list');
            setCards(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const handleMoreDetails = (pictureUrl) => {
        const pictureId = pictureUrl.split('/').pop().split('.')[0];
        router.push(`/details/${pictureId}`);
    };
    const handleSubmit = () => {
        fetchData();
        alert('Form submitted successfully!');
        closeModal();
    };

    return (
        <>
            {pageLoading && (
                <div className="spinner-container">
                    <ClipLoader color="#3498db" size={100} />
                </div>
            )}
            <>
                {!loading ? (
                    <>
                        <Image
                            src={plusImage}
                            alt="Plus"
                            width={120}
                            height={120}
                            className="insert-button"
                            onClick={openModal}
                        />
                    </>
                ) : (null)}
                <div className="container">
                    {loading ? (
                        <div className="spinner-container">
                            <ClipLoader color="#3498db" size={100} />
                        </div>
                    ) : (
                        cards.map((item, index) => (
                            <div
                                className="card"
                                key={index}
                                style={{
                                    backgroundImage: `url(${item.picture})`,
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                                onClick={() => handleMoreDetails(item.picture)}
                            >
                                <div className="info">
                                    <h2>{item.firstname + ' ' + item.lastname}</h2>
                                    <h6>{item.jobTitle}</h6>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} onSubmit={handleSubmit} />
            </>
        </>
    );
}
