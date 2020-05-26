import React, { Component } from "react";
import { NavLink, HashRouter, Route } from 'react-router-dom';
import './form.css';

import Cliente from './Cliente/Cliente';
import Factura from './Factura/Factura';
import Producto from './Producto/Producto';
import Vendedor from './Vendedor/Vendedor';
import Home from '../Home/Home';

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <ul className="header">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li>Cliente
                        <ul className="headerCliente">
                            <li><NavLink to="/newCliente">Nuevo Cliente</NavLink></li>
                            <li><NavLink to="/listCliente">Listar Cliente</NavLink></li>
                        </ul>
                    </li>
                    <li>Factura
                        <ul className="headerFactura">
                            <li><NavLink to="/newFactura">Nueva Factura</NavLink></li>
                            <li><NavLink to="/listFactura">Listar Factura</NavLink></li>
                        </ul>
                    </li>
                    <li>Producto
                        <ul>
                            <li><NavLink to="/producto">Nuevo Producto</NavLink></li>
                        </ul>
                    </li>
                    <li>Vendedor
                        <ul>
                            <li><NavLink to="/vendedor">Nuevo Vendedor</NavLink></li>
                        </ul>
                    </li>
                    
                </ul>
                <div className="content">
                    <Route path="/home" component={Home}/>
                    <Route path="/newCliente" component={Cliente}/>
                    <Route path="/producto" component={Producto}/>
                    <Route path="/newFactura" component={Factura}/>
                    <Route path="/vendedor" component={Vendedor}/>
                    
                </div>
                <div className="footer-page">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;