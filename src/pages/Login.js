import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { isMobile } from "react-device-detect";
import { Button } from 'react-bootstrap';

const baseUrl='http://localhost:3100/api/users/login';
const baseSecurityUrl='http://localhost:3100/api/security';
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            email: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);
    }

    iniciarSesion=async()=>{

        const user = { email: this.state.form.email,  password: this.state.form.password};
        await axios.post(baseUrl, user)
        .then(response=>{
            console.log(response.data);
            console.log('Mobile++++++++++++: ' +  isMobile);
            return response.data;
        })
        .then(response=>{

            if(response.code === 200){
                cookies.set('user-token', response.success, {path: "/"});
                localStorage.setItem("user-token", response.success);
                window.location.href="./home";
            }else {
                alert('El usuario y/o  contraseña no son validos.');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }
    
    componentDidMount() {

        if(localStorage.getItem('user-token')){
            //Validation of session            
            axios.get(baseSecurityUrl, {
                headers: {
                    'user-token': localStorage.getItem('user-token')
                    }
            })
            .then(response=>{
                console.log('VALLLL:' + JSON.stringify(response.data));
                return response.data;
            })
            .then(response=>{
                if(response.session === true){
                    window.location.href="./home";
                }else {
                    localStorage.removeItem('user-token');
                    window.location.href="./";
                }
            })
            .catch(error=>{
                console.log(error);
            })
            
        }
    }
    

    render() {

        //console.log('VALIDDATE COOKIE');
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
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
            <br/>

            <div class="container signin">
                <p>Si no tiene una cuenta <a href="register">Registrate</a>.</p>
            </div>


          </div>
        </div>
      </div>
        );
    }
}

export default Login;