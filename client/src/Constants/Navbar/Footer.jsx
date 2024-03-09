import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        const scrollY = window.scrollY;

        if (windowHeight + scrollY >= bodyHeight) {
            setShowFooter(true);
        } else {
            setShowFooter(false);
        }
    };

    return (
        <footer className={showFooter ? 'footer-show' : ''}>
            <p>KitKode @2024</p>
        </footer>
    );
};

export default Footer;
