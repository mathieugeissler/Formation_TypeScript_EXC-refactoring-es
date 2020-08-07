import fetch from 'node-fetch';
import { RandomUserApiResponse } from './model/user-random-api';
import { RandomUser } from './model/user-random';

const API = 'https://randomuser.me/api';

async function generateRandomUser(...userNationalities: Array<RandomUser.Nationality>) {
  const usersCreated: Array<RandomUser.User> = [];
  for (const nat of userNationalities) {
    const criteria: Map<string, string> = new Map();
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

async function getRandomUser(criterias: Map<string, string>): Promise<RandomUser.User> {
  console.log('DEBUG -- Generate user with criterias', criterias);
  let url = `${API}`;
  if (criterias && criterias.size) {
    // convert Map to searchParams
    const criteriaObject = Array.from(criterias)
      .reduce((obj: any, [key, val]: [string, string]) => {
        obj[key] = val;
        return obj;
      }, {});
    const searchParams = new URLSearchParams(criteriaObject);
    // create url
    url += `/?${searchParams.toString()}`;
    console.log('DEBUG -- Generate user with url', url);
  }

  try {
    const res = await fetch(url, { method: 'GET' });
    const json = (await res.json() as RandomUserApiResponse);
    return json.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

generateRandomUser('FR', 'DE');