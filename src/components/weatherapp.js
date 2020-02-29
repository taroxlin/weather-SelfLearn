/*
weather key 
https://api.openweathermap.org/data/2.5/weather?q={this.state.value}k&appid=2481fb9c00fa150040b10da0e356266a
https://samples.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=2481fb9c00fa150040b10da0e356266a



*/
import React from 'react';
import WeatherForm from './weatherform'
import WeatherResult from './weatherresult'

/* key for Weather app*/
const APIWkey = '2481fb9c00fa150040b10da0e356266a'

class WeatherApp extends React.Component {
    state = {
            value: '',
            date: '',
            city: '',
            temp: '',
            sunrise: '',
            sunset: '',
            pressure: '',
            windspeed: '',
            feels_like:'',
            err: false
    }

    IMG = imgName => {
        return require(`../image/${imgName}`)
    }


    handleCitySubmit = e => {
        e.preventDefault()
        const API =
            `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&appid=${APIWkey}`;

        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error("Blad 404")
            })
            .then(response => response.json())
            .then(data => {
                const time = new Date().toLocaleString()

                this.setState(prevState =>({
                    err: false,
                    date: time,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    pressure: data.main.pressure,
                    windspeed: data.wind.speed,
                    city: this.state.value,
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(prevState =>({
                    err: true,
                    city: prevState.value
                }))
            })
    }

    handleInputChange = e => {
        this.setState({
            value: e.target.value
        })
    }


    
    handleLocalization=e=>{
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(this.successLocalisation,this.failedLocalisation)
    }

    successLocalisation=pos=>{
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const APILoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIWkey}`
        
        fetch(APILoc)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error("Blad 404")
            })
            .then(response => response.json())
            .then(data => {
                const time = new Date().toLocaleString()

                this.setState(prevState =>({
                    err: false,
                    date: time,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    pressure: data.main.pressure,
                    windspeed: data.wind.speed,
                    city: data.name,
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(prevState =>({
                    err: true,
                }))
            })
    }


    failedLocalisation=err=>{
        alert(`Please turn ON geolocation at your webbrowser!`)
    }

    render() {
        return (
            <div className='weatherAppClass'>
                <img className='bgImage' alt='Global Map' src={this.IMG('bg.jpg')} />
                <h1 className="title">Check Your Weather!</h1>
                <WeatherForm
                    value={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handleCitySubmit}
                    localizeMe={this.handleLocalization}
                />
                <WeatherResult
                   weather={this.state}
                />
            </div>
        )
    }


}


export default WeatherApp  


/*e.preventDefault()*/