import React from 'react';
import "../css/Button.css"

const Button = ({onClick, texto,className}) => {
    return ( 
        <button className={className} onClick={onClick}>
            {texto}
        </button>
     );
}
 
export default Button;