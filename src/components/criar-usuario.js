import React, {Component} from 'react';
import axios from 'axios';
export default class CriarUsuario extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const usuario = {
            username: this.state.username,
        };

        axios.post('http://localhost:5000/usuarios/add',usuario)
            .then( res => console.log(res.data));

        this.setState({
            username: ''
        })

    }

    render() {
        return (
            <div className="mt-3">
                <h3>Cadastrar usuário</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group card col-md-6 mx-auto mt-3 shadow-lg">
                        <div className="card-body mx-auto col-md-6">
                            <label>Usuário: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.username}
                                   onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group mx-auto col-md-6 text-center">
                            <input type="submit" value="Criar" className="btn btn-outline-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
