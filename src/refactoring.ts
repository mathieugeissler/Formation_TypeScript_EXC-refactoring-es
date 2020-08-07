const fetch = require('node-fetch');
const API = 'https://randomuser.me/api';


async function generateRandomUser(...userNationalities) {
  const usersCreated = [];
  for (const nat of userNationalities) {
    const criteria = new Map();
    criteria.set('nat', nat);
    try {
      const user = await getRandomUser(criteria);
      usersCreated.push(user);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(usersCreated);
}

async function getRandomUser(criterias) {
  console.log('DEBUG -- Generate user with criterias', criterias);
  if (criterias && criterias.size) {
    // convert Map to searchParams
    const searchParams = new URLSearchParams(criterias);
    // create url
    const url = `${API}/?${searchParams.toString()}`;
    console.log('DEBUG -- Generate user with url', url);

    try {
      const res = await fetch(url, {method: 'GET'});
      const json = await res.json();
      return json.results[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

generateRandomUser('FR', 'DE');
