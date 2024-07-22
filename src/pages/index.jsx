import React, { useState, useEffect } from "react";
import ModalComponent from '../components/modal';
import { useRouter } from "next/router";
import axios from "axios";
import { Card } from "@nextui-org/react";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner

export default function App() {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://baseball-backend.onrender.com/list');
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
    }

    return (
        <>
            <header>
                <h1>Sprout</h1>
                <button className="insert-button" onClick={openModal}>Add</button>
            </header>
            <div className="container">
                {loading ? (
                    <div className="spinner-container">
                        <ClipLoader color="#3498db" size={50} />
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
                                transition: 'background-image 0.5s ease-in-out'
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
    );
}
