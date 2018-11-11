import React, { Component } from 'react'
import './Scroll.css';

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      films: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem('films')) {
      this.setState({
        isLoaded: true,
        films: JSON.parse(localStorage.getItem('films')),
      });
      return;
    }
    fetch("https://swapi.co/api/films/")
      .then(res => res.json())
      .then(
        (res) => {
          localStorage.setItem('films', JSON.stringify(res.results));
          this.setState({
            isLoaded: true,
            films: res.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, films } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      return (
        <aside className="scroll">
          <p>{randomFilm.opening_crawl}</p>
          <h3>{randomFilm.title}</h3>
          <h4>{randomFilm.release_date}</h4>
        </aside>
      );
    }
  }
}

export default Scroll;
