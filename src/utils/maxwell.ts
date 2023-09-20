import { Client } from 'maxwell-client';

interface ErrorInterface {
  code: number;
  desc: string;
}
export interface BackInterface {
  error: ErrorInterface;
  payload: any;
}

let sslEnabled = false;
if (typeof window !== 'undefined') {
  sslEnabled = window.location.protocol === 'https:';
}

let endpoint;
// const port = sslEnabled ? '1443' : '8081';
const port = '8081';

// if (process.env.NODE_ENV === 'development') {
// endpoint = `59.63.189.58:${port}`;
// } else {
//   endpoint = `59.63.189.59:${port}`;
// }

// endpoint = `59.63.189.58:8081`;
if (process.env.NODE_ENV === 'development') {
  endpoint = `59.63.189.59:${port}`;
} else {
  endpoint = `59.63.189.59:${port}`;
}

export const client = Client.singleton([endpoint], { sslEnabled });

let token: string;
export const setToken = (t: string) => {
  token = t;
};

export const getToken = () => token;

export function doer(type: string, value?: any): Promise<any> {
  if (value == null) {
    value = { token };
  } else {
    value.token = token;
  }

  return new Promise((resolve, reject) => {
    client
      .request(type, value, { sourceEnabled: true })
      .then((result: BackInterface) => {
        // console.log(`fetch api:${type}`, value, result);
        resolve(result);
      })
      .catch((error: Error) => {
        console.error(type, value, error);

        reject(error);
      });
  });
}

export default async (type: string, value?: any) => {
  if (value == null) {
    value = { token };
  } else {
    value.token = token;
  }

  try {
    const result = await client.request(type, value, { sourceEnabled: true });
    // console.log(`fetch api:${type}`, value, result);

    if (result?.error?.code !== 0) throw result?.error?.desc;

    return result.payload;
  } catch (error: any) {
    console.error('maxwell error', type, value, error);
    throw error;
  }
};
