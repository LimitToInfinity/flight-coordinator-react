const parseJSON = response => response.json();

export const authFetch = url => {
  const headers = { Authorization: `Bearer ${localStorage.token}` };
  return fetch(url, { headers }).then(parseJSON);
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