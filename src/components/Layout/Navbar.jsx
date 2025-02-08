import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const baseClasses = "px-4 py-2 rounded transition-transform duration-300";
    const activeClasses = "bg-gray-800 text-white shadow-xl scale-105";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 hover:shadow-md";

    return (
        <>
            <nav className="bg-gradient-to-b from-gray-900 to-gray-800 fixed w-full z-50 top-0 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <NavLink
                                to="/"
                                className="text-3xl font-extrabold text-white tracking-wide transform hover:scale-110 transition duration-300 ease-in-out animate-bounce"
                            >
                                FitMaster
                            </NavLink>
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <NavLink
                                to="/exercises"
                                className={({ isActive }) =>
                                    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                                }
                            >
                                Ejercicios
                            </NavLink>
                            <NavLink
                                to="/createRoutines"
                                className={({ isActive }) =>
                                    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                                }
                            >
                                Rutinas
                            </NavLink>
                            <NavLink
                                to="/comments"
                                className={({ isActive }) =>
                                    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                                }
                            >
                                Comentarios
                            </NavLink>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-300 focus:outline-none transform transition duration-300 hover:rotate-90"
                            >
                                <span className="sr-only">Abrir menú</span>
                                {menuOpen ? (
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {menuOpen && (
                    <div className="md:hidden animate-slideDown">
                        <ul className="px-2 pt-2 pb-3 space-y-4 bg-gray-800">
                            <li className="mt-4">
                                <NavLink
                                    onClick={() => setMenuOpen(false)}
                                    to="/exercises"
                                    className={({ isActive }) =>
                                        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                                    }
                                >
                                    Ejercicios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => setMenuOpen(false)}
                                    to="/createRoutines"
                                    className={({ isActive }) =>
                                        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                                    }
                                >
                                    Rutinas
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => setMenuOpen(false)}
                                    to="/comments"
                                    className={({ isActive }) =>
                                        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                                    }
                                >
                                    Comentarios
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
            {/* Spacer para empujar el contenido hacia abajo en móviles */}
            <div className="md:hidden" style={{ height: menuOpen ? "224px" : "64px" }}></div>
        </>
    );
}