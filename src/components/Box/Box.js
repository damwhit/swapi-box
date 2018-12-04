import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import CategoryButton from '../CategoryButton/CategoryButton';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import ApiHelper from '../ApiHelper/ApiHelper';
import './Box.css';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
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

  changeCategory(category) {
    const { resources } = this.state;
    const resourceExists = resources.some(resource => resource.category === category);
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
    const { numFavorites, resources } = this.state;
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
            <Route
              path="/:category(favorites|people|planets|vehicles)"
              render={({ match }) => (
                <ResultsContainer
                  category={match.params.category}
                  onClick={this.toggleFavoriteResource}
                  resources={resources}
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
