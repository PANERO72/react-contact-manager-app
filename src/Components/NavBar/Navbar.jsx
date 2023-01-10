import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
    
    <div className="container-fluid mx-auto">
        <div className='row'>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm py-3 px-5">
                <span className="navbar-brand"><i className=" fa fa-mobile-alt"></i>&nbsp; Administrador de Contactos en React</span>
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button> 
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className='nav-link active'>Inicio</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/about" className='nav-link'>Sobre Nosotros</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    </>
  )
}

export default Navbar;