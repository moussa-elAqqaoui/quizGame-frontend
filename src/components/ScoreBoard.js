import React, { Component, useState } from 'react';
import './ScoreB.css'
import './Playc.css'
import { w3cwebsocket } from 'websocket';

const client = new w3cwebsocket('ws://127.0.1:8000');

class ScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: []
        }
    }

    componentDidMount() {
        client.onopen = () => {
            console.log('receiving score');
        }

        client.onmessage = (message) => {
            const dataFormServer = JSON.parse(message.data);
            console.log('got score');
            if(dataFormServer.type === "score") {
                this.setState({
                    users: dataFormServer.users.sort((prev, next) => {
                        if (prev.score === next.score) {
                        return prev.Name <= next.Name ? 1 : -1;
                        } else 
                        return prev.score < next.score ? 1 : -1;
                    }),
                })
            }
    
        };
    };


    render() {
        var i=0;
        const player = this.state.users.filter((user, index) => 
            user.Name == this.props.name
        );
        console.log(player.score);
        return(
            <div className='card'>
                <div className="upper-container">
                    <div className="upper1">
                        <div className="classement">{i}</div>
                        <div className="score">{player.score}</div>
                    </div>
                    <div className="image-container">
                        <img 
                            src={player.avatar} 
                            alt="" 
                            height="100px" 
                            width="100px"
                        />
                    </div>
                </div>
                {/* players */}
                <div className="lower-container">
                   <div className="name1">{this.props.name}</div>
                    {/* map(player)=> render(player) */}
                    {
                        <div className='container'>
                            <div className="users">
                        {
                            this.state.users.map((user, index) => {
                                return (
                                        <div>
                                    <div className='item'>
                                            <div>{index + 1}</div>
                                            <div><img src={user.avatar} alt='avatar'/></div>
                                            <div className='name'>
                                                <div>{user.Name}</div>
                                            </div>
                                            <div className='score2'>{user.score}</div>
                                        </div>
                                    </div>
                                    
                                    )
                                })
                        }
                            </div> 
                        </div>
                    }
                </div>
            </div>

        )
    }
}

export default ScoreBoard

