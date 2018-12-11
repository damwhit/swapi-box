import Api from './api'

describe('Api', () => {
  describe('fetchResources', () => {
    const mockResources = [
      {name: 'Alderaan', category: 'planets', isFavorite: false},
      {name: 'Dagobah', category: 'planets', isFavorite: false},
      {name: 'Endor', category: 'planets', isFavorite: false},
    ];
    beforeEach(() => {
      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: mockResources,
        }),
      }));
    });

    it('fetch is called with the correct params', async () => {
      await Api.fetchResources('planets');
      expect(fetch).toHaveBeenCalledWith(`https://swapi.co/api/planets/`);
    });

    it('returns an array if status code is ok', async () => {
      await expect(Api.fetchResources('planets')).resolves.toEqual(mockResources);
    });

    it('throws an error if status code is not ok', async () => {
      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
      }));

      await expect(Api.fetchResources('adfafasd')).rejects.toEqual(Error('500'));
    });

    it('calls addInfo twice if the category is people', async () => {
      Api.handleAddInfo = jest.fn();
      await Api.fetchResources('people');
      expect(Api.handleAddInfo).toHaveBeenCalledTimes(2);
    });
  });

  describe('addInfo', () => {
    const mockResources = [
      {name: 'han', category: 'people', species: 'https://swapi.co/api/species/1'},
      {name: 'obi wan', category: 'people', species: 'https://swapi.co/api/species/1'},
      {name: 'luke', category: 'people', species: 'https://swapi.co/api/species/1'},
    ];

    beforeEach(() => {
      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          name: 'human'
        }),
      }));  
    });

    it('should call fetch with the correct params', async () => {
      await Api.addInfo('species', mockResources[0]);
      expect(fetch).toHaveBeenCalledWith('https://swapi.co/api/species/1');
    });

    it.skip('should return a promise when addInfo is called', ()=> {
    });
  });
});
