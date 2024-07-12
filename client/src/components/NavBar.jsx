import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import '../App.css';

const NavBar = ({display}) => {
    return (
        <div className={display ? "navbar active" : "navbar"}>
            <ul>
                <li><Link to="/profile"><IoPersonSharp /> Profile</Link></li>
                <li><Link to="/"><FaHome /> Home</Link></li>
                <li><Link to="/about"><BsInfoSquareFill /> About</Link></li>
                <li><Link to="/room-bookings"><FaBookReader /> Room Bookings</Link></li>
            </ul>
        </div>
    );
};

export default NavBar;
