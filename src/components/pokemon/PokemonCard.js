import React, { Component } from 'react'
import styled from 'styled-components'
import spinner from './assets/6.gif'
import {Link} from 'react-router-dom'

const id = "d8b6cac6216670061c92"
const sec = "93c72ed714109ed6d3474b9756ff5c8ee69c58f6"
const params = `?client_id=${id}&client_secret=${sec}`


const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
    `

const Card = styled.div`
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
&:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)
}
-moz-user-select: none;
-website-user-select: none;
user-select: none;
-o-user-select: none;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;


export default class PokemonCard extends Component {
    state ={
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        toManyRequests: false
    }

    componentDidMount () {
        const name = this.props.name
        const url = this.props.url
        const pokemonIndex = url.split('/')[url.split('/').length - 2]
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
        
        this.setState({
            name: name,
            imageUrl: imageUrl,
            pokemonIndex: pokemonIndex

    })
    console.log(imageUrl)
}

    render() {

        return (
            <div className='col-md-3 col-sm-6 mb-5'>
            <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
            <Card className="card">
            <h5 className="card-header">{this.state.pokemonIndex}</h5>
            {this.state.imageLoading ? (
                <img src={spinner} style={{width: '5em', height: '5em'}} className="card-img-top rounded mx-auto d-block mt-2"></img>
                ) : null}
            <Sprite 
            className="card-img-top rounded mx-auto mt-2"
            onLoad={() => this.setState({imageLoading: false})}
            onError={() => this.setState({ toManyRequests: true })}
            src="{this.state.imageUrl}"
            style={
                this.state.toManyRequests ? { display: "none"} :
                this.state.imageLoading ? null : {display: "block"}
            }
            />
            {this.state.toManyRequests ? (
                <h6 className="mx-auto"> 
             <span className="badge badge-danger mt-2">Too Many Requests</span>
             </h6>
             ) : null}
            
            <div className="card-body mx-auto">
                <h6 className="card-title">
                {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(
                        letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                        )
                        .join(' ')}
                </h6>
            </div>
            </Card>
            </StyledLink>
            </div>
            
        )
    }
}
