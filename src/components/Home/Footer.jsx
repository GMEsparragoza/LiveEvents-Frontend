import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex gap-4 mb-4 md:mb-0">
                    <Link to="/" className="text-text hover:text-primary">Home</Link>
                    <Link to="/events" className="text-text hover:text-primary">Events</Link>
                    <Link to="/contact" className="text-text hover:text-primary">Contact</Link>
                </div>
                <div className="flex gap-4">
                    <Link to="https://facebook.com/Live-Events" className="text-text hover:text-primary">Facebook</Link>
                    <Link to="https://twitter.com/Live-Events" className="text-text hover:text-primary">Twitter</Link>
                    <Link to="https://instagram.com/Live-Events" className="text-text hover:text-primary">Instagram</Link>
                </div>
            </div>
            <p className="mt-6 text-center text-sm text-text-secondary">
                © {new Date().getFullYear()} Live Events. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;