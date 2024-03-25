import React, { useState, useEffect } from "react";
import { borrarColores, crearColores, obtenerColores } from "../helpers/api";
import Swal from "sweetalert2";

export default function Form() {
    let [viewColor, setViewColor] = useState(false);
    let [colorName, setColorName] = useState('');
    let [colors, setColors] = useState([]);

    let setearColores = async () => {
        let response = await obtenerColores()
        let colores = await response.json()

        console.log(colores)
        if (!colores) setColors([]);

        setColors(colores)
    }
    
    useEffect(() => {
        setearColores()
    }, []);

    return (
        <>
            <form className="my-4" onSubmit={async (e) => {
                e.preventDefault();

                //let newColors = [...colors, colorName];
                //localStorage.setItem('colors', JSON.stringify(newColors));
                //setColors(newColors);
                let response = await crearColores({
                    nombreColor: colorName
                })

                let message = await response.json()

                if (response.status === 200) {
                    Swal.fire({
                        title: "Añadido",
                        text: message.message,
                        icon: "success"
                    });
                    setColors([...colors, { nombreColor: colorName }]);
                    setColorName('');
                    setViewColor(false);
                }

            }}>
                {viewColor && <div className="w-12 h-12 rounded-md mx-auto mb-4" style={{ backgroundColor: colorName }}></div>}
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md mr-2"
                    placeholder="Ingresa un color"
                    onChange={(e) => {
                        setColorName(e.target.value);
                        setViewColor(true);
                    }}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Guardar
                </button>
            </form>
            <div className="flex flex-wrap justify-center">
                {colors?.map((color, id) => (
                    <div
                        key={id}
                        className="w-32 h-32 rounded-md mx-2 my-2 flex flex-col"
                        style={{ backgroundColor: color.nombreColor }}
                    >
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md mb-2 hover:bg-red-600"
                            onClick={async () => {
                                let response = await borrarColores(color._id)

                                let message = response.json()

                                if (response.status === 200) {
                                    Swal.fire({
                                        title: "Eliminado",
                                        text: message.message,
                                        icon: "success"
                                    });
                                }
                                location.href='/'
                            }}
                        >
                            Borrar
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}