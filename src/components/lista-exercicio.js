import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const Exercicio = props => (
    <tr>
        <td>{props.exercicio.username}</td>
        <td>{props.exercicio.description}</td>
        <td>{props.exercicio.duration}</td>
        <td>{props.exercicio.date.substring(0, 10)}</td>
        <td>
            <Link to={"/editar-exercicio/" + props.exercicio._id}>editar</Link> | <a href="#" onClick={() => {
            props.deleteExercicio(props.exercicio._id)
        }}>deletar</a>
        </td>
    </tr>
);

export default class ListaExercicio extends Component {
    constructor(props) {
        super(props);

        this.deleteExercicio = this.deleteExercicio.bind(this);

        this.state = {exercicios: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercicio/')
            .then(response => {
                this.setState({exercicios: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercicio(id) {
        axios.delete('http://localhost:5000/exercicio/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercicios: this.state.exercicios.filter(el => el.id !== id)
        });

        window.location = '/';
    }

    exercicioList() {
        return this.state.exercicios.map(currentexercicio => {
            return <Exercicio exercicio={currentexercicio} deleteExercicio={this.deleteExercicio}
                              key={currentexercicio._id}/>
        })
    }


    render() {
        return (
            <div>
                <h3 className="mt-3"> Exercícios cadastrados </h3>
                <table className="table mt-3">
                    <thead className="thead-light">
                    <tr>
                        <th>Nome de usuário</th>
                        <th>Descrição</th>
                        <th>Duração</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.exercicioList()}
                    </tbody>
                </table>
            </div>
        )
    }

}

