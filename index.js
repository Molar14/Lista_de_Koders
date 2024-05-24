const fs = require('node:fs')
const express =require("express")
const server = express()
const dbName = "koders.json"
const fileExist = fs.existsSync(dbName)
server.use(express.json())
if(!fileExist){
    fs.writeFileSync(dbName, JSON.stringify({koders:[]}))
}
function updateAlumnos(koders){
    const newkoders = {koders: koders}
    const newkodersAsString = JSON.stringify(newkoders)
    fs.writeFileSync(dbName,newkodersAsString)
}
function getAlumnos(){
    const content =fs.readFileSync(dbName,"utf8")
    return JSON.parse(content).koders
}
function eliminar(nombre){
    const arrayAlumnos = getAlumnos()
    for(let i=0;i<arrayAlumnos.length;i++){
        const comparativo=arrayAlumnos[i]
        if(nombre===comparativo){
            arrayAlumnos.splice(i, 1)
        }
    }
    updateAlumnos(arrayAlumnos)
}
server.get('/koders', (request, response)=> {
    const arrayAlumnos = getAlumnos()
    response.status(200)
    response.json({
        message: "all koders",
        koders: arrayAlumnos
        })
    }
)
server.post('/koders', (request, response)=> {
    const arrayAlumnos = getAlumnos()   
    const newKoder =  request.body
    const newKoderName = request.body.name
    const newKoderGen = request.body.Generacion
    const newKoderGender = request.body.Genero
    const newKoderAge = request.body.Edad
    const newKoderActive = request.body.Activo
    if(!newKoderName){
        response.status(400)
        response.json({
            message: "Name required"
        })
        return
    }
    if(!newKoderGen){
        response.status(400)
        response.json({
            message: "Generacion required"
        })
        return
    }
    if(!newKoderGender){
        response.status(400)
        response.json({
            message: "Gender required"
        })
        return
    }
    if(!newKoderAge){
        response.status(400)
        response.json({
            message: "Age required"
        })
        return
    }
    if(!newKoderActive){
        response.status(400)
        response.json({
            message: "If is active required"
        })
        return
    }
    response.status(400)
    arrayAlumnos.push(newKoder)
    updateAlumnos(arrayAlumnos)
    response.json({
        message: "New koder added",
        koders: arrayAlumnos
    })
})
server.delete('/koders/:name', (request, response)=> {
    const arrayAlumnos = getAlumnos()  
    const KoderName =request.params.name
    eliminar(KoderName)
    response.json({
        message: "Student deleted successfully",
        koders: arrayAlumnos
    })
})
server.delete('/koders', (request, response)=> {
    updateAlumnos([])
    response.json({
        message: "SE FUE TODOOOO"
    })
})
server.listen(8080,()=>{
    console.log("server running on port 8080")
})