import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Card from '../components/Card';


const cookies = new Cookies();


class Home extends Component {
   

    cerrarSesion=()=>{
        cookies.remove('user-token', {path: "/"});
        localStorage.removeItem('user-token');
        window.location.href='./';
    }

    componentDidMount() {
        
        if(!localStorage.getItem('user-token')){
            window.location.href="./";
        }
    }

    
    

    render() {
       
        return (         

            <div>           
                
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Films App</a>
                        </li> 
                    </ul>                   
                </div>
                <div class="float-right">
                <button class="btn btn-outline-success my-2 my-sm-0 float-right" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                </div>
            </nav>

            <div class="container">
                <Card/>
            </div>

           

                
            </div>
        );
    }
}

export default Home;