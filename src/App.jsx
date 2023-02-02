import { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Canvas from './components/Canvas';
import Button from './components/Button';

function App() {
  const [noMenuPrincipal, setMenuPrincipal] = useState(true)

  const irProJogo = () =>{
    console.log("sus");
    setMenuPrincipal(!noMenuPrincipal)
  }
  if(!noMenuPrincipal)
  return (
    <>
    <div className='menu-container'>

    <Menu titulo={"Ponggers"} botao1={irProJogo}/>
    </div>
    </>
  );
  else{

    return(
      <>
      <div className='centralizador'>

      <Canvas/>
      </div>
      <Button className={"button-menu"} onClick={irProJogo} texto={"Voltar"}/>  
      </>
    ) 
    
  }
}

export default App;
