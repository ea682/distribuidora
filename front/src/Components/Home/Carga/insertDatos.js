import React from "react";
import api from '../../config/Api';



const rutaSubir = `${api}/api/upload`

class IsertDatos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: ''}
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){

  }
  
  render() {
    
    return (
      <div>
        <form action={rutaSubir} method="POST" enctype="multipart/form-data">
            <input type="file" name="file"/>
            <input type="submit" value="Subir"/>
        </form>
      </div>
    );
  }
}

export default IsertDatos;
