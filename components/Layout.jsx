import React, { Fragment } from 'react';
import Head from 'next/head';
import Header from './Header';


const Layout = ({children}) => {


    return (
        <Fragment>
            <Head>
                <title>NodeSend</title>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.7.6/tailwind.min.css" />
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {children}
                    </main>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Layout;