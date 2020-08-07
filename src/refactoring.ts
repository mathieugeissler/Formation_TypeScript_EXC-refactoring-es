import fetch from 'node-fetch';
const API = 'https://randomuser.me/api';

async function generateRandomUser(...userNationalities: Array<Nationality>) {
  const usersCreated: Array<RandomUser> = [];
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

async function getRandomUser(criterias: Map<string, string>): Promise<RandomUser> {
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

type Nationality = string;

interface RandomUserApiResponse {
  info: RandomUserApiInfo;
  results: Array<RandomUser>;
}

interface RandomUserApiInfo {
  page: number
  results: number
  seed: string;
  version: string;
}

interface RandomUserName {
  title: string,
  first: string,
  last: string,
}

interface RandomUserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string,
  state: string,
  country: string,
  postcode: number,
  coordinates: {
    latitude: string,
    longitude: string,
  },
  timezone: {
    offset: string,
    description: string,
  },
}

interface RandomUserLogin {
  uuid: string,
  username: string,
  password: string,
  salt: string,
  md5: string,
  sha1: string,
  sha256: string,
}

interface RandomUserAge {
  date: string;
  age: number;
}

interface RandomUserId {
  name: string,
  value: string,
}

interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface RandomUser {
  gender: string;
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  login: RandomUserLogin;
  dob: RandomUserAge;
  registered: RandomUserAge;
  phone: string,
  cell: string,
  id: RandomUserId;
  picture: RandomUserPicture;
  nat: Nationality | Array<Nationality>,
}

