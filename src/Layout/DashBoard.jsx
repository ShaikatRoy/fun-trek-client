import { Link, Outlet } from "react-router-dom";
import { FaCheckSquare, FaCodiepie, FaHome } from 'react-icons/fa';

const DashBoard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                   
                    <li><Link to="/dashboard/selectedclass"><FaCheckSquare></FaCheckSquare> My Selected Classes</Link></li>
                    <li><Link to="/dashboard/enrolledclass"><FaCodiepie></FaCodiepie> My Enrolled Classes</Link></li>
                
                    <div className="divider"></div>
                    <li><Link to="/"><FaHome></FaHome> Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoard;