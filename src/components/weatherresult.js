import React from 'react'

const WeatherResult = props => {

    const { err, city, date, temp, feels_like, sunrise, sunset, pressure, windspeed } = props.weather

    let content = null;
    if(!err && city ){
        const sunriseTime = new Date(sunrise*1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset*1000).toLocaleTimeString()
        content =(
            <div className="ResultInfo">
                <h3>{`Wyszukiwanie dla miasta: ${city}`}</h3>
                <h4>{`Data ${date}`}</h4>
                <h4>{`Temp. powietrza: ${temp}°C`}</h4>
                <h4>{`Temp. odczuwalna: ${feels_like}°C`}</h4>
                <h4>{`Wschód słonca: ${sunriseTime}`}</h4>
                <h4>{`Zachód słonca: ${sunsetTime}`}</h4>
                <h4>{`Ciśnienie powietrza ${pressure} hPa`}</h4>
                <h4>{`Siła wiatru ${windspeed} m/s`}</h4>
         </div>
        )
    }

    return (
        <div className="ResultCont">
        {err? `Nie można znalesc miasta ${city}!`: content }

        </div>
    )




}



export default WeatherResult 