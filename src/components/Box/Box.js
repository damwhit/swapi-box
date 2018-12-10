import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import CategoryButton from '../CategoryButton/CategoryButton';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Api from '../../helpers/Api/Api';
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      numFavorites: 0,
      resources: JSON.parse(localStorage.getItem('resources')) || [],
    };
  }

  componentDidMount() {
    this.countFavorites();
  }

  toggleFavoriteResource = (name) => {
    const { resources } = this.state;
    const toggleable = resources.find(resource => resource.name === name);
    toggleable.isFavorite = !toggleable.isFavorite;
    this.setState({ resources });
    localStorage.setItem('resources', JSON.stringify(resources));
    this.countFavorites();
  }

  async changeCategory(category) {
    this.setState({ isLoaded: false });
    const { resources } = this.state;
    const resourceExists = resources.some(resource => resource.category === category);
    if (resourceExists || category === 'favorites') return this.setState({ isLoaded: true });
    try {
      const fetchedResources = await Api.fetchResources(category);
      const newResources = [...resources, ...fetchedResources];
      this.setState({ isLoaded: true, resources: newResources });
      localStorage.setItem('resources', JSON.stringify(newResources));
    } catch (error) {
      this.setState({ error });
    }
  }

  countFavorites() {
    const { resources } = this.state;
    const numFavorites = resources.filter(resource => (
      resource.isFavorite
    )).length;
    this.setState({ numFavorites });
  }

  renderCategoryButton(category) {
    return (
      <CategoryButton
        onClick={() => this.changeCategory(category)}
        category={category}
      />
    );
  }

  render() {
    const {
      error, isLoaded, numFavorites, resources,
    } = this.state;
    return (
      <BrowserRouter>
        <main className="box">
          <section>
            <h1>SWAPI-Box</h1>
            <FavoritesButton
              onClick={() => this.changeCategory('favorites')}
              numFavorites={numFavorites}
            />
          </section>
          <section>
            {this.renderCategoryButton('people')}
            {this.renderCategoryButton('planets')}
            {this.renderCategoryButton('vehicles')}
          </section>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <h3>
                  Pick a category
                </h3>
              )}
            />
            if
            <Route
              path="/:category(favorites|people|planets|vehicles)"
              render={({ match }) => (
                <ResultsContainer
                  category={match.params.category}
                  onClick={this.toggleFavoriteResource}
                  resources={resources}
                  error={error}
                  isLoaded={isLoaded}
                />
              )}
            />
            <Route
              render={() => (
                <h3>
                  404 Page not found
                </h3>
              )}
            />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default Box;
