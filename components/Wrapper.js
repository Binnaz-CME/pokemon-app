import React from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import Footer from './Footer';

const Wrapper = ({children , title}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="Pokemon-app" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Navigation />

            <main className="container mx-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Wrapper;
