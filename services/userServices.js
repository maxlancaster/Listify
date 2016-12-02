const BASE_URL = 'http://localhost:3000/users';

  var request = require('request-promise-native');

  export default {
    register : (username, password) => {
      return request({
        uri : BASE_URL,
        method: 'POST',
        json : true,
        body : {
          username : username,
          password : password
        }
      });
    },

    login : (username, password) => {
      return request({
        uri : BASE_URL + '/login',
        method: 'POST',
        body : {
          username : username,
          password : password
        },
        json : true
      });
    },

    getCurrentUser: () => {
      return request({
        uri : BASE_URL + '/current',
        method: 'GET',
        json : true
      });
    },

    logout : () => {
      return request({
        uri : BASE_URL + '/logout',
        method: 'PUT',
        json : true
      });
    },

    search : (username) => {
      return request({
        uri: BASE_URL + '/search' + `/${username}`,
        method: 'POST',
        json: true
      });
    }

    // follow : (username, following) => {
    //   return request({
    //     uri : BASE_URL + `/follow/${username}`,
    //     method: 'POST',
    //     json : true,
    //     body: {
    //       following: following
    //     }
    //   });
    // },

    // getWhoImFollowing : () => {
    //   return request(BASE_URL + '/following', {
    //     method: 'GET',
    //     json : true
    //   });
    // }
  }
