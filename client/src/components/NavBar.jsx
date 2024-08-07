import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import '../App.css';

const NavBar = ({display, hideNavBar }) => {
    return (
        <div className={display ? "navbar active" : "navbar"}>
            <ul>
                <li><Link to="/" onClick={hideNavBar}><FaHome /> Home</Link></li>
                <li><Link to="/about" onClick={hideNavBar}><BsInfoSquareFill /> About</Link></li>
                <li><Link to="/room-bookings" onClick={hideNavBar}><FaBookReader /> Room Bookings</Link></li>
                <li><Link to="/profile" onClick={hideNavBar}><IoPersonSharp /> Profile</Link></li>
            </ul>
        </div>
    );
};

export default NavBar;
