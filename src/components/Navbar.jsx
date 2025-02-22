import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Íconos para el menú
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();
    console.log(user);

    // Función para alternar el menú
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-background-secondary text-text border-b border-border shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link to="/" className="text-4xl font-bold text-primary">
                    Live<span className="text-secondary">Events</span>
                </Link>

                {/* Menú Desktop */}
                <ul className="hidden md:flex space-x-8 text-lg">
                    <li>
                        <Link to="/" className="hover:text-primary transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" className="hover:text-primary transition duration-300">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-primary transition duration-300">
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Botones Desktop */}
                <div className="hidden md:flex space-x-4">
                    {user?.role === 'admin' ? (
                        <Link to="/admin/dashboard" onClick={toggleMenu} className="px-6 py-2 buttonSecondary">
                            Dashboard
                        </Link>
                    ) : ('')}
                    {user ? (
                        <Link to="/profile" className={`px-6 py-2 ${user?.role === 'admin' ? 'buttonPrimary' : 'buttonSecondary'}`}>
                            Profile
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="px-6 py-2 buttonSecondary">
                                Sign In
                            </Link>
                            <Link to="/register" className="px-6 py-2 buttonPrimary">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Botón Menú Móvil */}
                <button
                    className="md:hidden text-text focus:outline-none"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Menú Móvil */}
            <div
                className={`md:hidden fixed inset-0 bg-background/90 z-50 flex flex-col items-center justify-center space-y-6 text-2xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button className="absolute top-6 right-6 text-text" onClick={toggleMenu}>
                    <X size={32} />
                </button>

                <Link to="/" onClick={toggleMenu} className="hover:text-primary">
                    Home
                </Link>
                <Link to="/events" onClick={toggleMenu} className="hover:text-primary">
                    Events
                </Link>
                <Link to="/contact" onClick={toggleMenu} className="hover:text-primary">
                    Contact
                </Link>

                <div className="flex space-x-4">
                    {user?.role === 'admin' ? (
                        <Link to="/admin/dashboard" onClick={toggleMenu} className="px-6 py-2 buttonSecondary">
                            Dashboard
                        </Link>
                    ) : ('')}
                    {user ? (
                        <Link to="/profile" onClick={toggleMenu} className={`px-6 py-2 ${user?.role === 'admin' ? 'buttonPrimary' : 'buttonSecondary'}`}>
                            Profile
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" onClick={toggleMenu} className="px-6 py-2 buttonSecondary">
                                Sign In
                            </Link>
                            <Link to="/register" onClick={toggleMenu} className="px-6 py-2 buttonPrimary">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};