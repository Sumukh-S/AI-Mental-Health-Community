import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout; 