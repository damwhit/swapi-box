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
      const peopleWithSpecies = await this.addInfo(resources, 'species');
      resources = await this.addInfo(peopleWithSpecies, 'homeworld');
    }
    return resources;
  }

  static handleResponse(response) {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  }

  static addInfo(resources, type) {
    const promises = resources.map(async (person) => {
      const response = await fetch(person[type]);
      const typeInfo = await this.handleResponse(response);
      return { ...person, [type]: typeInfo };
    });
    return Promise.all(promises);
  }
}

export default Api;
