import React, { useEffect , useState } from 'react';
import { myFirestore } from '../Configure/firebase';
import { Link } from "react-router-dom";
import './listLibros.css'

export function useListLibros() {
    const [Libros, setLibros] = useState();
    const [lyrics, setLyrics] = useState();
    const [flag, setFlag] = useState();
    const [idBook, setIdBook] = useState();
    const [busqPor, setBusqPor] = useState();

    useEffect(()=>{
        myFirestore.collection('Libros')
        .onSnapshot(snap=>{
            setLibros({
                items: snap.docs.map(doc=>{
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })
            })
        }) 
    },[])

    function guardar(idLib, idAu) {
        let date = new Date();
        if(date.getHours()>12){
            localStorage.setItem("horario", "pm")
        }else{
            localStorage.setItem("horario", "am")
        }
        localStorage.setItem("fechaReserva", `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
        localStorage.setItem("hora", `${date.getHours()}:${date.getMinutes()}`)
        localStorage.setItem("fechaExpira", `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`)
        localStorage.setItem("idLibro",idLib)
        localStorage.setItem("idAutor",idAu)
    }

    function search(e) {
        setLyrics(e.target.value)
        if(e.target.value){
            setFlag(true)
            console.log("TRUE")
        }else{
            setFlag(false)
            console.log("FALSE")
        }
    }

    function test(e) {
        console.log(e.target.value)
        if(e.target.value==="Titulo"){
            setBusqPor('titulo')
        }else if(e.target.value==="Autor"){
            setBusqPor('autor')
        }else if(e.target.value==="Editorial"){
            setBusqPor('editorial')
        }
    }

    function libLibrosUser() {
        if(flag!==false&&flag!==true){
            return(
                <div className="main">
                    <h1 style={{textAlign:"center"}}>Libros</h1>
                    <div class="input-group">
                        <input onChange={search} placeholder="Buscar libro por" type="text" className="form-control" aria-label="Text input with dropdown button"/>
                        <div onChange={test} className="input-group-append">
                            <select className="btn btn-dark dropdown-toggle">
                                <option>Titulo</option>
                                <option>Autor</option>
                                <option>Editorial</option>
                            </select>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                            <th style={{textAlign: "center"}} scope="col">Titulo</th>
                            <th style={{textAlign: "center"}} scope="col">Editorial</th>
                            <th style={{textAlign: "center"}} scope="col">Autor</th>
                            <th style={{textAlign: "center"}} scope="col">Cantidad</th>
                            
                            <th style={{textAlign: "center"}} scope="col">ID</th>
                            <th style={{textAlign: "center"}} scope="col">Reservar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Libros !== undefined? Libros.items.map((items)=>(
                            <tr>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                                
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/Libros/Reserved" onClick={()=>guardar(items.id, items.data.autor)}>Reservar</Link></td>
                            </tr>
                            )):null}
                        </tbody>
                    </table>
                    <a href="/biblioteca/Main/list-reserved"><button id="register" className="btn btn-dark btn-lg">Reservado</button></a>
                    <label>{idBook}</label>
                    <a href="/biblioteca/Main"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
                </div>
            )
        }else{
            return(
                <div className="main">
                    <h1 style={{textAlign:"center"}}>Libros</h1>
                    <div class="input-group">
                        <input onChange={search} placeholder="Buscar libro por" type="text" className="form-control" aria-label="Text input with dropdown button"/>
                        <div onChange={test} className="input-group-append">
                            <select className="btn btn-dark dropdown-toggle">
                                <option>Titulo</option>
                                <option>Autor</option>
                                <option>Editorial</option>
                            </select>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                            <th style={{textAlign: "center"}} scope="col">Titulo</th>
                            <th style={{textAlign: "center"}} scope="col">Editorial</th>
                            <th style={{textAlign: "center"}} scope="col">Autor</th>
                            <th style={{textAlign: "center"}} scope="col">Cantidad</th>
                            
                            <th style={{textAlign: "center"}} scope="col">ID</th>
                            <th style={{textAlign: "center"}} scope="col">Reservar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Libros !== undefined? Libros.items.map((items)=>(
                                busqPor==="titulo"||busqPor===undefined?
                                items.data.titulo.indexOf(`${lyrics}`)!==-1?
                            <tr>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                                
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/Libros/Reserved" onClick={()=>guardar(items.id, items.data.autor)}>Reservar</Link></td>
                            </tr>:null:busqPor==="autor"?
                                items.data.autor.indexOf(`${lyrics}`)!==-1?
                            <tr>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                                
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/Libros/Reserved" onClick={()=>guardar(items.id, items.data.autor)}>Reservar</Link></td>
                            </tr>:null:busqPor==="editorial"?
                                items.data.editorial.indexOf(`${lyrics}`)!==-1?
                            <tr>
                                <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                                <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                                <td style={{textAlign: "center"}}>{items.data.autor}</td>
                                <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                                
                                <td style={{textAlign: "center"}}>{items.id}</td>
                                <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/Libros/Reserved" onClick={()=>guardar(items.id, items.data.autor)}>Reservar</Link></td>
                            </tr>:null:null
                            )):null}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    function libLibros(){
        return(
            <div className="main">
                <h1 style={{textAlign:"center"}}>Libros</h1>
                {/*<button onClick={()=>console.log(Libros.items.map((items)=>items.id))}>click</button>*/}
                
                <table class="table">
                    <thead>
                        <tr>
                        <th style={{textAlign: "center"}} scope="col">Titulo</th>
                        <th style={{textAlign: "center"}} scope="col">Editorial</th>
                        <th style={{textAlign: "center"}} scope="col">Autor</th>
                        <th style={{textAlign: "center"}} scope="col">Cantidad</th>
                        
                        <th style={{textAlign: "center"}} scope="col">ID</th>
                        <th style={{textAlign: "center"}} scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Libros !== undefined? Libros.items.map((items)=>(
                        <tr>
                            <td style={{textAlign: "center"}}>{items.data.titulo}</td>
                            <td style={{textAlign: "center"}}>{items.data.editorial}</td>
                            <td style={{textAlign: "center"}}>{items.data.autor}</td>
                            <td style={{textAlign: "center"}}>{items.data.cantidad}</td>
                           
                            <td style={{textAlign: "center"}}>{items.id}</td>
                            <td style={{textAlign: "center"}}><Link to="/biblioteca/Main/Libros/Edit" onClick={()=>guardar(items.id, items.data.autor)}>Editar</Link></td>
                        </tr>
                        )):null}
                    </tbody>
                </table>
                <a href="/biblioteca/Main"><button id="back" className="btn btn-dark btn-lg">Atras</button></a>
                <a href="/biblioteca/Main/Libros/Register"><button id="register" className="btn btn-dark btn-lg">Registrar libro</button></a>
            </div>
        )
    }

    function noExists(){
        return(
            <h1>Page not found</h1>
        )
    }

    return(
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
                {/*localStorage.getItem("User")==="adminSuper"?libLibros():noExists()*/}
                {localStorage.getItem("User")==="adminSuper"?libLibros():localStorage.getItem("User")?libLibrosUser():noExists()}
            </div>
            <div className="col-lg-2"></div>
        </div>
    )
}