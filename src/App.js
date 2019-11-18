import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar"
import ListaExercicio from "./components/lista-exercicio";
import EditarExercicio from "./components/editar-exercicio";
import CriarExercicio from "./components/criar-exercicio";
import CriarUsuario from "./components/criar-usuario"

function App() {
    return (
        <Router>
            <div className="container-fluid">
                <Navbar/>
                <Route path="/" exact component={ListaExercicio}/>
                <Route path="/editar-exercicio/:id" component={EditarExercicio}/>
                <Route path="/criar-exercicio" component={CriarExercicio}/>
                <Route path="/criar-usuario" component={CriarUsuario}/>
            </div>
        </Router>
    );
}
export default App;
