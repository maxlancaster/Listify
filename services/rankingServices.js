const BASE_URL = 'http://localhost:3000/rankings';

var request = require('request-promise-native');

export default {
    getAllTweets : () => {
    return request({
        uri : 'http://localhost:3000/tweets',
        method: 'GET',
        json : true
    });
},

getConsensusById : (consensus_id) => {
    return request({
        uri : BASE_URL + `/${consensus_id}`,
        method: 'GET',
        json : true
    });
},

getRankingsByUser : (username) => {
    return request({
        uri : BASE_URL + `/rankings/${username}`,
        method: 'GET',
        json : true
    });
},

getHomepage : () => {
    return request({
        uri : BASE_URL + '/users/following',
        method: 'GET',
        json : true
    });
},

createTweet : (content) => {
    return request({
        uri : BASE_URL,
        method: 'POST',
        body: {
            content: content
        },
        json : true
    });
},

deleteTweet : (tweet_id) => {
    return request({
        uri : BASE_URL + `/${tweet_id}`,
        method: 'DELETE'
    });
},

retweet : (tweet_id) => {
    return request({
        uri : BASE_URL + `/${tweet_id}`,
        method: 'PUT',
        body: {
            deleting: false
        },
        json : true
    });
},

deleteRetweet : (tweet_id) => {
    return request({
        uri : BASE_URL + `${tweet_id}`,
        method: 'PUT',
        body: {
            deleting: true
        },
        json : true
    });
}
}