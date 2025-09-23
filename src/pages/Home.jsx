import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';

function Home() {
    return(
        <div>
           <h2 className='text-center'>Pagina principal</h2>
        </div>
    );
}
export default Home;