import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://comments-microservice.herokuapp.com/v1';
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const systemToken = localStorage.getItem('systemToken');
  options.headers.set('Authorization', `Bearer ${systemToken}`);
  return fetchUtils.fetchJson(url, options);
};

const convertOne = data => ({ ...data, id: data.msAdminId });
const convertMany = data => data.map(item => ({ ...item, id: item.msAdminId }));

export default {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    return httpClient(url).then(({ json }) => ({
      data: convertMany(json.data),
      total: json.data.length,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: convertOne(json.data),
    })),

  getMany: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url).then(({ json }) => ({ data: convertMany(json.data) }));
  },

  getManyReference: (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    return httpClient(url).then(({ json }) => ({
      data: convertMany(json.data),
      total: json.data.length,
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: convertOne(json.data) })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: convertMany(json.data) }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: convertOne(json.data),
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: convertMany(json.data) })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: convertMany(json.data) }));
  }
};
