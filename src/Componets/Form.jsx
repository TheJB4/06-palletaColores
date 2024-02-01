import React, { useState,useEffect } from "react";

export default function Form(){
    let [viewColor,setViewColor] = useState(false)
    let [colorName,setColorName] = useState('')
    let [colors,setColors] = useState([])

    useEffect(() => {
        const storedColors = JSON.parse(localStorage.getItem('colors')) || [];
        setColors(storedColors);
    }, []);

    return(
    <>
            <form onSubmit={(e)=>{
            e.preventDefault()

            let newColors = [...colors, colorName]
            localStorage.setItem('colors',JSON.stringify(newColors))
            setColors(newColors)
        }}>
            {viewColor && <div style={{backgroundColor:colorName,width:"50px",height:"50px"}}></div>}
            <input type="text" onChange={(e) => {
                setColorName(e.target.value)
                setViewColor(true)
            }}/>
            <input type="submit" value='guardar' />
        </form>
        <div className=" d-flex w-50">
            {colors.map((color,id) => (
                <div style={{backgroundColor:color}} key={id}>
                    <button onClick={(id) => {
                               const updatedColors = [...colors];
                               updatedColors.splice(id, 1);
                               setColors(updatedColors);
                               localStorage.setItem('colors', JSON.stringify(updatedColors));
                    }}>Borrar</button>
                </div>
            ))}
        </div>
    </>
    )
}