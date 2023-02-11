import { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import MenuStands from './components/MenuStands';
import Canvas from './components/Canvas';
import Button from './components/Button';
import { standsExistentes } from './components/Canvas';

function App() {
  const [noMenuPrincipal, setMenuPrincipal] = useState(true)
  const [noMenuStand, setNoStand] = useState(false)
  const [noJogo, setNoJogo] = useState(false)

  const irMenuPrincipal = () =>{
  console.log("sus");
    setMenuPrincipal(true)
    setNoStand(false)
    setNoJogo(false)
  }
  const irMenuStand = () =>{
    console.log("sus");
      setMenuPrincipal(false)
      setNoStand(true)
    }
  const irJogo =()=>{
    setMenuPrincipal(false)
    setNoStand(false)
    setNoJogo(true)
  }

  if(noMenuPrincipal)
  return (
    <>
    {console.log("jaaj")}
    <div className='menu-container'>

    <Menu titulo={"Ponggers"} botao1={irJogo}/>
    </div>
    </>
  );
  else if(noMenuStand){
    return(
      // standsExistentes.forEach((stand)=>console.log(stand))
      <div>

        <h1>Lol</h1>
        <MenuStands/>
      </div>
    )
  }
  else{

    return(
      <>
      <div className='centralizador'>

      <Canvas/>
      </div>
      <Button className={"button-menu"} onClick={irMenuPrincipal} texto={"Voltar"}/>  
      </>
    ) 
    
  }
}

export default App;
