import React, {useEffect} from 'react';
import MapInterface from '../components/MapInterface';
import {useDispatch, useSelector} from "react-redux";
import {setHomeState} from "../redux/pages/service.js";

const Home = () => {
    const dispatch = useDispatch();
    const title = useSelector((state) => state.home.title);

    useEffect(() => {
        dispatch(setHomeState('Map'));
    }, [dispatch]);

    return (
        <div>
            <h1>{title}</h1>
            <MapInterface />
        </div>
    );
};

export default Home;