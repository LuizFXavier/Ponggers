import { standsExistentes } from "./Canvas";
import Button from "./Button";
import React, { useEffect, useState } from 'react';

const MenuStands = () => {
    const [stand1, setStand1] = useState('')
    const [stand2, setStand2] = useState('')

    // standsExistentes.forEach((stand)=>{
    //     console.log(stand)
    // })
    const botoes = []
    useEffect(()=>{

        standsExistentes.forEach(stand=>{
            botoes.push(
    
                <Button onClick={setStand1(stand)} texto={stand} className={"button-menu"}></Button>
            )
        })
        console.log(botoes);
    })
    return ( 
        <>
        <Button onClick={setStand1("stand")} texto={"stand"} className={"button-menu"}></Button>
        <button>sus</button>
            {botoes}
        </>
     );
    
}
 
export default MenuStands;
