import { Link } from "react-router-dom";
import { FaFacebook, FaInbox, FaInstagram, FaLinkedinIn, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/classes">Classes</Link></li>

            {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        </>
    );

    return (
        <>
            <div className="footer items-center p-4 bg-transparent bg-black max-w-screen-xl text-black">
                <div className="items-center grid-flow-col">
                    <div className="flex">
                        <p className="flex me-5"><FaInbox className="me-2"></FaInbox> Info@printers.com</p>
                        <p className="flex"><FaPhone className="me-2"></FaPhone> +91 0800 123 4567</p>
                    </div>
                </div>
                <div className="grid-flow-col gap-4 place-self-center md:justify-self-end">
                    <Link><FaLinkedinIn></FaLinkedinIn></Link>
                    <Link><FaInstagram></FaInstagram></Link>
                    <Link><FaFacebook></FaFacebook></Link>
                    <Link><FaTwitter></FaTwitter></Link>
                    <Link><FaYoutube></FaYoutube></Link>
                </div>
            </div>

            <div className="navbar fixed z-10 bg-opacity-30 bg-black max-w-screen-xl text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <img className="w-44 h-24" src="https://i.ibb.co/wSrvKrF/Logo-copy.png" alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                {user ? (
                    <div className="avatar navbar-end">
                        <div>
                            <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
                        </div>
                        <div className="w-14">
                            <img src={user.photoURL} alt="User Profile" className="w-full h-full rounded-full" />
                        </div>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </>
    );
};

export default Navbar;
