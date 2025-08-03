import React from 'react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-primary text-white p-4">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by CareerIn.</p>
            </aside>
        </footer>
    );
};

export default Footer;