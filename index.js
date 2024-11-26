const axios = require('axios');

async function getToken(domain, audience, client_id, client_secret) {
  const data = {
    audience: audience,
    grant_type : 'client_credentials',
    client_id : client_id,
    client_secret : client_secret,
  };

  const url = 'https://' + domain + '/oauth/token';

  try {
    const response = await axios.post(url, data, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token', error.response ? error.response.data : error.message);
    //throw error;
  }
}

async function createUser(url, email, password, token) {
    const data = {
      email: email,
      password: password,
      connection: 'Username-Password-Authentication',
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
}


(async () => {
    try {
        //Налаштування з завдання
        const domain = 'kpi.eu.auth0.com';
        const client_id = 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0';
        const client_secret = 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB';
        const audience = 'https://kpi.eu.auth0.com/api/v2/';

        const url_user = 'https://kpi.eu.auth0.com/api/v2/users';
        const email = 'some_email_v4@gmail.com';
        const password = '#Aa12345678';

        //Власні налаштування
        /*const domain = 'dev-7sfm4dwi0agzg42e.us.auth0.com';
        const client_id = '2rt9zMZergxHgi7SqMDSo2nBLXw2gHV3';
        const client_secret = 'UhwrkkaOHZ8jLwirvoivMAG8n1AeEe6NfI1itImdyjEbAzsygoo0Pjizl_HuYRD6';
        const audience = 'https://dev-7sfm4dwi0agzg42e.us.auth0.com/api/v2/';
        
        const url_user = 'https://dev-7sfm4dwi0agzg42e.us.auth0.com/api/v2/users';
        const email = 'some_user_v2@gmail.com';
        const password = '#Aa12345678';*/
        

        //Отримати токен
        const token = await getToken(domain, audience, client_id, client_secret);
        console.log(token);

        //Створити користувача
        const user = await createUser(url_user, email, password, token);
        console.log('User created successfully:', user);

    } catch (error) {
      console.error('Operation failed:', error);
    }
  })();