const parseJSON = response => response.json();

export const authFetch = (url, method, body) => {
  const headers = { 
    Authorization: `Bearer ${localStorage.token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return method === 'DELETE'
    ? fetch(url, { method, headers, body })
    : fetch(url, { method, headers, body }).then(parseJSON);
}

export const noAuthFetch = (url, method, body) => {
  const headers = { 'Content-Type': 'application/json' };
  return fetch(url, { method, headers, body }).then(parseJSON);
}

function unNest(instance) {
  return instance.attributes;
}

export function extractData(fastJson) {
  return fastJson.data.map(unNest);
}

export function aToZ(a, b) {
  return a.name.localeCompare(b.name);
}

export const capitalize = string => {
  return string[0].toUpperCase() + string.slice(1);
}