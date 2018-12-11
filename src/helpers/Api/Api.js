class Api {
  static async fetchResources(category) {
    let resources;
    const response = await fetch(`https://swapi.co/api/${category}/`);
    const fetchedResources = await this.handleResponse(response);
    resources = fetchedResources.results.map(resource => ({
      ...resource,
      category,
      isFavorite: false,
    }));
    if (category === 'people') {
      const peopleWithSpecies = await this.handleAddInfo(resources, 'species');
      resources = await this.handleAddInfo(peopleWithSpecies, 'homeworld');
    }
    return resources;
  }

  static handleResponse(response) {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  }

  static handleAddInfo(resources, type) {
    const promises = resources.map(this.addInfo.bind(null, type));
    return Promise.all(promises);
  }

  static async addInfo(type, resource) {
    const response = await fetch(resource[type]);
    const typeInfo = await this.handleResponse(response);
    return { ...resource, [type]: typeInfo };
  }
}

export default Api;
