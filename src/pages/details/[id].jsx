import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedinIn } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner

const DetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://baseball-backend.onrender.com/list');
            const data = response.data;
            const foundItem = data.find(i => i.picture.split('/').pop().split('.')[0] === id);
            setItem(foundItem);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading once data is fetched
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) return (
        <div className="spinner-container">
            <ClipLoader color="#3498db" size={50} />
        </div>
    );

    if (!item) return <p>Item not found.</p>;

    const twitterUrl = item.twitter ? `https://twitter.com/${item.twitter}` : null;
    const instagramUrl = item.instagram ? `https://instagram.com/${item.instagram}` : null;
    const facebookUrl = item.facebook ? `https://facebook.com/${item.facebook}` : null;
    const linkedinUrl = item.linkedin ? `https://linkedin.com/in/${item.linkedin}` : null;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src={item.picture} alt={item.firstname + ' ' + item.lastname} className="profile-picture" />
                <div className="profile-details">
                    <h1>{item.firstname + ' ' + item.lastname}</h1>
                    <h2>{item.jobTitle}</h2>
                    <p><strong>Email:</strong> {item.email}</p>
                    <p><strong>About Me:</strong> {item.aboutMe}</p>
                    <div className="social-links">
                        {twitterUrl && (
                            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                                <FaTwitter size={24} />
                            </a>
                        )}
                        {instagramUrl && (
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={24} />
                            </a>
                        )}
                        {facebookUrl && (
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                                <FaFacebook size={24} />
                            </a>
                        )}
                        {linkedinUrl && (
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn size={24} />
                            </a>
                        )}
                    </div>
                    <button className="back-button" onClick={() => router.push('/')}>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
