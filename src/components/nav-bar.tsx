import logo from '../assets/wellnest-logo.svg';
import {Link} from 'react-router-dom';
import { useState } from 'react';

// interface NumericProp {
//     value: number;
// }

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="w-full flex items-center justify-between px-8 py-6 bg-transparent">
            <Link to="/">
                <div className="group flex justify-between items-center">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <div className="flex flex-col items-center space-x-2 font-bruno text-2xl font-bold text-gray-800">
                        <div className="group-hover:underline group-hover:decoration-gray-800 transition-transform duration-300">Well</div>
                        <div className="group-hover:underline group-hover:decoration-gray-800 transition-all duration-300">Nest</div>
                    </div>
                </div>
            </Link>

            <div className="hidden md:flex space-x-8 text-gray-700">
                <a href="#pricing" className="hover:text-blue-500">Pricing</a>
                <a href="#about" className="hover:text-blue-500">About WellNest</a>
                <a href="#contact" className="hover:text-blue-500">Contacts</a>
            </div>
            <div className="hidden md:flex space-x-4">
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg bg-white hover:bg-blue-600 hover:text-white">Sign In</button>
                <button className="md:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</button>
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label={isOpen ? "Close menu" : "Open menu"}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                </button>
            </div>
            <div className={`absolute top-16 sm:top-20 left-0 w-full bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} origin-top`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-300 ease-in-out">Pricing</a>
                    <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-300 ease-in-out">About WellNest</a>
                    <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-300 ease-in-out">Contacts</a>
                    <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-300 ease-in-out">Sign In</button>
                    <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 ease-in-out">Sign Up</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar