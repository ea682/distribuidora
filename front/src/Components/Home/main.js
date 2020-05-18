import React, { Component } from "react";
import { NavLink, HashRouter, Route } from 'react-router-dom';

import Cliente from '../Home/Cliente';
import Factura from '../Home/Factura';
import Producto from '../Home/Producto';
import Home from '../Home/Home';

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/cliente">Stuff</NavLink></li>
                    <li><NavLink to="/producto">Contact</NavLink></li>
                    <li><NavLink to="/factura">Contact</NavLink></li>
                </ul>
                <div className="content">
                    <Route path="/home" component={Home}/>
                    <Route path="/cliente" component={Cliente}/>
                    <Route path="/producto" component={Producto}/>
                    <Route path="/factura" component={Factura}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;