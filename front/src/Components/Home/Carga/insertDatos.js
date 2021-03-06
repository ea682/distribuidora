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
      <div className="form-page">
        <form action={rutaSubir} method="POST" enctype="multipart/form-data">
          <br></br>
          <div className='form-group'>
            <label>Importar Datos</label>
          </div>
          <div className='form-group'>
            <div className = 'custom-file mb-3'>
              <input type="file" name="file" className='custom-file-input' id="inputGroupFile"/>
              <label class="custom-file-label" for="customFile">Selecionar archivo</label>
            </div>
          </div>
          <div className='form-group'>
            <input type="submit" value="Subir" className = 'btn btn-primary'/>
          </div>
            
        </form>
      </div>
    );
  }
}

export default IsertDatos;
