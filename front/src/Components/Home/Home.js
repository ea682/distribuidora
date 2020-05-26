import React from 'react';

function Home() {
  return (
    <div>
      <h2>HELLO</h2>
      <p>Hola Mundo!</p>
      <p>{localStorage.getItem('cool-jwt')}</p>
    </div>
  );
}

export default Home;
