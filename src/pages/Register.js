import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const baseUrl='http://localhost:3100/api/users/register';


class Register extends Component {
    state={
        form:{
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    

    registerUser=async()=>{

        if(this.state.form.password === this.state.form.confirmPassword){
            const user = { email: this.state.form.email,  password: this.state.form.password};
            await axios.post(baseUrl, user)
            .then(response=>{
                console.log(response.data);
                console.log(response.status);
                return response.data;
            })
            .then(response=>{

                if(response.id !== undefined){   
                    alert('Registrado correctamente.');                 
                    window.location.href="./";
                }else {
                    alert('No se ha podido registrar el usuario.');
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }else{
            alert('Las contraseñas no coinciden.');
        }

        

    }

    

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Correo: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <label>Confirmar Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.registerUser()}>Registrarse</button>

            <div class="container signin">
                <p>Si ya te encuentras registrado <a href="/">Inicia sesión</a>.</p>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

export default Register;