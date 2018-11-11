import React, { Component } from 'react'
import FavoritesButton from '../FavoritesButton/FavoritesButton.js';
import CategoryButton from '../CategoryButton/CategoryButton.js';
import ResultCard from '../ResultCard/ResultCard.js';
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      numFavorites: 0,
      resources: JSON.parse(localStorage.getItem('resources')),
    };
  }

  componentDidMount() {
    this.countFavorites();
  }

  countFavorites() {
    this.setState({
      numFavorites: this.state.resources.filter(resource => resource.isFavorite === true).length
    });
  }

  renderCategoryButton(category) {
    return (
      <CategoryButton 
        onClick={() => this.showCategory(category)} 
        value={category}
      />
    );
  }
  
  showCategory(category) {
    if (!category) {
      return <article>Pick a category</article>
    } else {
      const items = this.state.resources.filter((resource) => {
        return resource.category === category;
      });
      items.forEach((item) => {
        this.renderResultCard(item);
      });
    }

    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>loaded</div>
    }
  }

  renderResultCard(result) {
    return (
      <ResultCard value={result}/>
    );
  }

  render() {
    if (true) {
      return (
        <main className="box">
          <section>
            <h1>SWAPI-Box</h1>
            <FavoritesButton value={this.state.numFavorites}/>
          </section>
          <section>
            {this.renderCategoryButton('people')}
            {this.renderCategoryButton('planets')}
            {this.renderCategoryButton('vehicles')}
            <section>
              {this.showCategory(null)}
            </section>
          </section>
        </main>
      );
    }
  }
}

export default Box;
