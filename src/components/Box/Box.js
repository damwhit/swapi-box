import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import FavoritesButton from '../FavoritesButton/FavoritesButton.js';
import CategoryButton from '../CategoryButton/CategoryButton.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer.js';
import ApiHelper from '../ApiHelper/ApiHelper.js';
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

  changeCategory(category) {
    this.setState({
      category: category,
    });
    const resourceExists = this.state.resources.some((resource) => resource.category === category);
    if (resourceExists && category !== 'favorites') return;
    ApiHelper.fetchResources(category);
    // const { error, isLoaded } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    //   return <div>loaded</div>
    // }
  }

  toggleFavoriteResource = (name) => {
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
        onClick={() => this.changeCategory(category)} 
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
                onClick={() => this.changeCategory('favorites')} 
                value={this.state.numFavorites}
              />
            </section>
            <section>
              {this.renderCategoryButton('people')}
              {this.renderCategoryButton('planets')}
              {this.renderCategoryButton('vehicles')}
            </section>
            <Route path='/:category' render={({ match }) => {
              return (
                <ResultsContainer 
                  category={match.params.category}
                  onClick={this.toggleFavoriteResource} 
                  resources={this.state.resources}
                />
              );
            }} />
          </main>
        </BrowserRouter>
      );
    }
  }
}

export default Box;
