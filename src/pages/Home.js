import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends Component {

    cerrarSesion=()=>{
        cookies.remove('user-token', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('user-token')){
            window.location.href="./";
        }
    }

    render() {
        console.log('user-token: '+ cookies.get('user-token'));       
        return (
            <div>
                Home Principal

                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Home;