import React, { Component } from 'react'
import FavoritesButton from '../FavoritesButton/FavoritesButton.js';
import CategoryButton from '../CategoryButton/CategoryButton.js';
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      resource: null
    };
  }

  handleClick() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>loaded</div>
    }
  }


  renderResultsCards() {
    if (!this.state.resource) {
      return <article>Select a category</article>
    }
  }

  render() {
    if (true) {
      return (
        <main className="box">
          <section>
            <h1>SWAPI-Box</h1>
            <FavoritesButton value={1}/>
          </section>
          <section>
            <CategoryButton value="people"/>
            <CategoryButton value="planets"/>
            <CategoryButton value="vehicles"/>
            <section>
              {this.renderResultsCards()}
            </section>
          </section>
        </main>
      );
    }
  }
}

export default Box;
