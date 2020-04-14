import fetch from 'node-fetch';
import User from '../models/User';

async function getToken(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const url = 'http://authapi:4000/authapi/auth/login';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
        }),
      };

      const req = await fetch(url, options)
        .then(async res => {
          const data = await res.json();
          if (res.status === 200) {
            console.log('ADMIN USER EXISTS');
            console.log('TOKEN AUQIRED', data.token);
            resolve(data);
          }
          return data;
        })
        .then(async res => {
          const user = await User.create({
            role: 'admin',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
          })
            .then(async user => {
              console.log('CREATING NEW ADMIN USER');
              return await user.save();
            })
            .then(async user => {
              const req = await fetch(url, options);
              const res = await req.json();

              console.log('TOKEN AQUIRED');
              resolve(res.token);
            });
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default getToken();
