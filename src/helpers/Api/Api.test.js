import Api from './api'

describe('Api', () => {
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

  it('calls addInfo if the category is people', async () => {
    Api.addInfo = jest.fn();
    await Api.fetchResources('people');
    expect(Api.addInfo).toHaveBeenCalledTimes(2);
  });

})
