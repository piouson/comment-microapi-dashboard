import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import convertAPIData from '../utils/convert-api-data';

const apiUrl = 'https://comments-microservice.herokuapp.com/v1';
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const systemToken = localStorage.getItem('systemToken');
  options.headers.set('Authorization', `Bearer ${systemToken}`);
  return fetchUtils.fetchJson(url, options);
};

export default {
  getList: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`)
      .then(({ json }) => ({
        data: convertAPIData(json.data),
        total: json.data.length,
      })),

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`)
      .then(({ json }) => ({
        data: convertAPIData(json.data),
      })),

  getMany: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`)
      .then(({ json }) => ({
        data: convertAPIData(json.data)
      })),

  getManyReference: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`)
      .then(({ json }) => ({
        data: convertAPIData(json.data),
        total: json.data.length,
      })),

  update: (resource, params) => {
    const token = localStorage.getItem('systemToken');
    console.log(params);
    if (token === params.id || token === params.msAdminId) {
      return httpClient(`${apiUrl}/${resource}`, {
        method: 'PATCH',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: convertAPIData(json.data)
      }));
    }
    return Promise.reject();
  },

  updateMany: (resource, params) => null,

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/create`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: convertAPIData(json.data),
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({
      data: convertAPIData(json.data)
    })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: convertAPIData(json.data)
    }));
  }
};
