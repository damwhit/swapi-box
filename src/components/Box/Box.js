import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import FavoritesButton from '../FavoritesButton/FavoritesButton.js';
import CategoryButton from '../CategoryButton/CategoryButton.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer.js';
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      category: null,
      numFavorites: 0,
      resources: JSON.parse(localStorage.getItem('resources')) || [],
      results: [],
    };
  }

  componentDidMount() {
    this.countFavorites();
  }

  countFavorites() {
    this.setState({
      numFavorites: this.state.resources.filter(resource => resource.isFavorite).length
    });
  }

  changeResults(category) {
    const resources = this.state.resources;
    let results;
    if (category === 'favorites') {
      results = resources.filter(resource => resource.isFavorite);
    } else {
      results = resources.filter((resource) => {
        return resource.category === category;
      });
    }
    this.setState({
      category: category,
      results: results
    });
    // const { error, isLoaded } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    //   return <div>loaded</div>
    // }
  }

  toggleFavoriteResource(name) {
    const resources = this.state.resources;
    const resource = resources.find(resource => resource.name === name);
    resource.isFavorite = !resource.isFavorite;
    this.setState({ resources: resources });
    localStorage.setItem('resources', JSON.stringify(resources));
    this.countFavorites();
  }
  
  renderCategoryButton(category) {
    return (
      <CategoryButton 
        onClick={() => this.changeResults(category)} 
        value={category}
      />
    );
  }

  render() {
    if (true) {
      return (
        <BrowserRouter>
          <main className="box">
            <section>
              <h1>SWAPI-Box</h1>
              <FavoritesButton 
                onClick={() => this.changeResults('favorites')} 
                value={this.state.numFavorites}
              />
            </section>
            <section>
              {this.renderCategoryButton('people')}
              {this.renderCategoryButton('planets')}
              {this.renderCategoryButton('vehicles')}
            </section>
            <ResultsContainer 
              category={this.state.category}
              onClick={(name) => this.toggleFavoriteResource(name)} 
              results={this.state.results}
            />
          </main>
        </BrowserRouter>
      );
    }
  }
}

export default Box;
