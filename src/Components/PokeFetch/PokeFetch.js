import React, {Component} from 'react';
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      pokeTime: 0,
      timeOut: undefined
    }
  }

  decrementTimer() {
    this.setState({
      timeOut: setTimeout(() => {
        if (this.state.pokeTime > 0) {
          this.setState({
            pokeTime: this.state.pokeTime - 1
          },() => {
            if (this.state.pokeTime > 0) {
              this.decrementTimer()
            }
          })
        }
      }, 1000)
    })
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    clearTimeout(this.state.timeOut) 
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          pokeTime: 10,
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
        this.decrementTimer()
      })
      .catch((err) => console.log(err))
  }

  
  
  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>

        <h1 className={"who"}>Who's That Pokemon?:</h1>
        
        <h1 className={"timer"}>{this.state.pokeTime}</h1>
        <div className={'pokeWrap'}>
          <img className={this.state.pokeTime <= 0 ? "pokeImg" : "pokeImg pokeImgDark" } id={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeTime <= 0 ? this.state.pokeName : '' }</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;