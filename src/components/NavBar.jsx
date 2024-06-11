import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = ({display}) => {
    return (
        <div className={display ? "navbar active" : "navbar"}>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About/User Manual</Link></li>
                <li><Link to="/room-bookings">Room Bookings</Link></li>
            </ul>
        </div>
    );
};

export default NavBar;
