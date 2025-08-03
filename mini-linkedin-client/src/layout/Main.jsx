import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='max-w-5xl mx-auto'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-285px)]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;