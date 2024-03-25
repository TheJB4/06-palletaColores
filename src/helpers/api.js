let URL = 'http://localhost:4001/api/colores'

export const obtenerColores = async () => {
    try {
        let response = await fetch(URL)

        return response
    } catch (err) {
        console.log(err)
    }
}

export const crearColores = async (data) => {
    try {
        let response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response
    } catch (err) {
        console.log(err)
    }
}

export const borrarColores = async (id) => {
    try {
        let response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
        })

        return response
    } catch (err) {
        console.log(err)
    }
}