import React from 'react';


 const WeatherForm =props=>{

    return (
        <form className="formClass" >
        <input 
        id="typedCity" 
        type="text" 
        placeholder="Write a city..." 
        value={props.value}
        onChange={props.change}/>
            <button onClick={props.submit} id="subButton">Check</button>
            <button onClick={props.localizeMe} id="locButton">Locate Me</button>
        </form>
        )
    }
        
export default WeatherForm