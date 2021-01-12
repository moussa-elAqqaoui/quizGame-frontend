import React, { Component } from 'react'
import { w3cwebsocket as W3Cwebsocket } from 'websocket';
import 'antd/dist/antd.css';
import Particles from 'react-tsparticles';
import './App.css'
import Quiz from './components/Quiz';
import Login from './components/Login'
import ScoreBoard from './components/ScoreBoard'
const particleParams = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#0000ff",
      animation: {
        enable: true,
        speed: 4,
        sync: false
      }
    },
    shape: {
      type: "circle",
      stroke: {
        width: 2
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "https://cdn.matteobruni.it/images/particles/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 3,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ff0000",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    },
    life: {
      duration: {
        sync: false,
        value: 3
      },
      count: 0,
      delay: {
        random: {
          enable: true,
          minimumValue: 0.5
        },
        value: 1
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true,
  background: {
    color: "#000000",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover"
  }
}

const client = new W3Cwebsocket('ws://127.0.1:8000');

class App extends Component {
  constructor(props) {
    super(props);
    this.handlerIsJoinedIn = this.handlerIsJoinedIn.bind(this);
    this.handlerSendResponse = this.handlerSendResponse.bind(this);
    this.state = {
      userName: '',
      isJoinedIn: false,
      gameOver: false,
      messages: [],
      questions: []
    }
  }
  
  handlerIsJoinedIn(e) {
    this.setState({
      userName: e.userName,
      isJoinedIn: e.isJoinedIn,
    });
    this.onButtonClicked(e.userName,"i'm here send me my first questoin");
  }

  handlerSendResponse(responseId) {
    client.send(JSON.stringify({
      type: "response",
      response: responseId,
      // question id ;
    }))
  }
  onButtonClicked = (userName,value) => {
    client.send(JSON.stringify({
      type: "message",
      msg: value,
      user: userName,
    }));
  }
  componentDidMount() {
    client.onopen = () => {
      console.log('Websocket Client connected');
    };
    
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got replay',message.data);
      if(dataFromServer.type === "message") {
        // this.setState((state) => ({ 
        //   messages: [... this.state.messages,
        //   {
        //       msg: dataFromServer.msg,
        //     user: dataFromServer.user
        //   }]
        // }))
      } else if(dataFromServer.type === "question") {
        console.log(dataFromServer.answerOptions)
        this.setState({
          questions: [... this.state.questions,dataFromServer]
        })
      } else if(dataFromServer.type == "gameOver") {
        this.setState({
          gameOver: true,
        })
      }
    };
  }
  render() {
    return (
      <div>
        <Particles 
        params = {particleParams} 
        style={{
          width: '100%',
          backgroundColor: "#453764"
        }}
        className ="particles"/>
        <div>
          {
            this.state.isJoinedIn
            ?
            (
              this.state.gameOver 
              ?
              (
              <div className="app"  >
                Game Over
              </div>
              )
              :
              (
              <div >
                {
                  this.state.questions.length == 0 ? <h1> waiting</h1> 
                  :
                  (
                    <div className="App">
                      <ScoreBoard name = {this.state.userName}/>
                      <Quiz 
                        question={this.state.questions.shift()}
                        submit = {this.handlerSendResponse}
                      />
                    </div>
                  )
                }            
              </div>
              )
            )
            :
            (
              <Login handler={this.handlerIsJoinedIn}/>
            )
          }
        </div>
      </div>
    )
  }
}

export default App;