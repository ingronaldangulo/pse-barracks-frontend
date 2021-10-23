import React, {useState, Fragment} from "react";
import axios from 'axios';

const baseSecurityUrl='http://localhost:3100/api/security';
const baseFilmsUrl='http://localhost:3100/api/films';

function Card  ()  {
    const [data, setData] = useState([]);

    const loadfilms = ()=>{
        console.log("Cargando films...");
        axios.get(baseFilmsUrl, {
            headers: {
                'user-token': localStorage.getItem('user-token')
                }
        })
        .then(response=>{
            console.log('FILMS: ' +  JSON.stringify(response.data)); 
            setData(response.data);            
            console.log('FILMS: ' +  JSON.stringify(data));            
        })        
        .catch(error=>{
            console.log(error);
        })      
    }

    return (
        <Fragment>            
            <button onClick={loadfilms}> Cargar Peliculas</button>
            {
                data.map(film => (
                        <div class='card' >
                            <div class='card-body'>
                                <h5 class='card-title'>{ film.title }</h5>                        
                                <p class='card-text'>{ film.description }</p>
                            </div>
                        </div>
                    )
                    
                )
            }  
                               
        </Fragment>
        
    );

}


export default Card;