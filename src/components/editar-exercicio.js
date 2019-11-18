import React, {Component} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';
import axios from 'axios';


registerLocale('pt', pt);

export default class EditarExercicio extends Component {

    constructor(props) {

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercicio/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/usuarios/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercicio = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };
        console.log(exercicio);

        axios.post('http://localhost:5000/exercicio/update/' + this.props.match.params.id, exercicio)
            .then(res => console.log(res.data));

        window.location = '/';
    }


    render() {
        return (
            <div className="mt-3">
                <h3>Editar exercício</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group card col-md-6 mx-auto mt-3 shadow-lg">
                        <div className="card-body mx-auto col-md-6">
                            <label>Usuário: </label>
                            <select ref="userInput"
                                    required
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function (user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group mx-auto col-md-6">
                            <label>Descrição: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.description}
                                   onChange={this.onChangeDescription}
                            />
                        </div>
                        <div className="form-group mx-auto col-md-6">
                            <label>Duração (em minutos): </label>
                            <input
                                type="text"
                                className="form-control "
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                            />
                        </div>
                        <div className="form-group mx-auto col-md-6">
                            <label>Data: </label>
                            <div>
                                <DatePicker
                                    locale='pt'
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                            </div>
                        </div>
                        <div className="form-group mx-auto col-md-6 text-center">
                            <input type="submit" value="Editar" className="btn btn-outline-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
