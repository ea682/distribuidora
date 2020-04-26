import React from 'react';
import MenuItem from './MenuItem.js';
class Categorias extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }
  render(){
    return (
      <div className= 'category'>
          <li>
              <h3>{this.props.name}</h3>
              <ul>
                  {this.props.items.map(item =><MenuItem name={item} key={item} />)}
              </ul>
          </li>
      </div>
    );
  }
  
}

export default Categorias;