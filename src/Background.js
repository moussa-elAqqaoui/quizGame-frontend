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

export default particleParams;