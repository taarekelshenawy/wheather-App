import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import searchicon from "../images/search.png";
import sunny from "../images/sunny.png";
import humidity from "../images/humidity.png";
import windspeed from "../images/wind.png";
import drizzle from "../images/drizzel.png";
import mist from "../images/heavy-rain.png";
import snow from "../images/snow.png";
import clouds from "../images/clouds.png";
import rain from "../images/rain.png";
import { Audio } from 'react-loader-spinner';

export default function Weather() {

    const [state,setState]=useState({
        celicius:2,
        country:"london",
        humidity:"25%",
        windspeed:"48",
    })
    const [image,setImage]=useState(sunny);
    const[loading,setLoading]=useState(true);
    let inputref = useRef();
     let apikey = process.env.REACT_APP_WEATHER_API_KEY;
    async function showcity(city){
        try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`);
        var data = await response.json();
        if(response.status === 404){
           document.querySelector(".display").style.display ="none";
           document.getElementById("valid").innerHTML="valid value";
        }
        else{
            document.querySelector(".display").style.display ="block";
            document.getElementById("valid").innerHTML="";
        
            if(data.weather[0].main === "Clear"){
                setImage(sunny)
           }else if(data.weather[0].main === "Drizzle"){
             setImage(drizzle)
        
           }
           else if(data.weather[0].main === "Mist"){
            setImage(mist)
           }
           else if(data.weather[0].main === "Snow"){
            setImage(snow)

            }
            else if(data.weather[0].main === "Clouds"){
                setImage(clouds)

            }
             else if(data.weather[0].main === "Rain"){
                    setImage(rain)
             }
            setState({
                celicius :data.main.temp,
                country:data.name,
                humidity:data.main.humidity,
                windspeed:data.wind.speed,   
            })
        
           
           
        }
       
        }
        catch(error){
        console.log(error.message)
        }
        finally{
            setLoading(false)
        }
               
        

        }

         useEffect(()=>{
        showcity("egypt")

    },[])
       
    function showweather(){
        let city = inputref.current.value;
        showcity(city);
        inputref.current.value="";

    }
  return (
    <div className='container'>
        { loading ?
                    <div style={{width:"100%",height:"100vh",
              display:"flex",justifyContent:"center",alignItems:"center"}}>
             <Audio
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                
                />
         </div>


        :
             <div className='weather_content'>

                        <div className='search'>
                                <input type='text' placeholder='Search' ref={inputref} ></input>
                                <img src={searchicon} alt='' width="40px" onClick={showweather}></img>
                            
                            </div>
                            <p id="valid"></p>

                        <div className='display'>

                            <img src={image} alt='' className='weathericon' width="90px"></img>
                            <div className='country'>
                            <p>{Math.round(state.celicius)} °C</p>
                            <h3>{state.country}</h3>

                            </div>
                        
                            <div className='weatherinfo'>
                                <div className='humidity'>
                                    <img src={humidity} alt='' ></img>
                                    <div >
                                        <p>{state.humidity}%</p>
                                        <p>humidity</p>
                                    </div>

                                </div>
                                <div className='windspeed'>
                                    <img src={windspeed} alt='' ></img>
                                    <div >
                                        <p>{Math.round(state.windspeed)}%</p>
                                        <p>wind speed</p>
                                    </div>

                                </div>

                            </div>
                        
                        </div>

             </div>

      
                    }

    </div>
  )
}
