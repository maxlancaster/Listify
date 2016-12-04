const BASE_URL = 'http://localhost:3000/api/rankings';

var request = require('request-promise-native');

export default {
	submitRanking : (content) => {
	    return request({
	        uri : BASE_URL + '/submit',
	        method: 'POST',
	        json : true,
	        body : {content : content}
	    });
	},

	loadEditPage : (list_id) => {
		return request({
			uri : BASE_URL + '/edit' + `/${list_id}`,
			method : 'GET',
			json : true
		})
	},

	getRankingById : (ranking_id) => {
		return request({
			uri : BASE_URL + '/get' + `/${ranking_id}`,
			method: 'GET',
			json: true
		})
	}
	// ,
	// getListById : (consensus_id) => {
	//     return request({
	//         uri : BASE_URL + `/${consensus_id}`,
	//         method: 'GET',
	//         json : true
	//     });
	// },

	// getRankingsByUser : (username) => {
	//     return request({
	//         uri : BASE_URL + `/rankings/${username}`,
	//         method: 'GET',
	//         json : true
	//     });
	// },

	// getHomepage : () => {
	//     return request({
	//         uri : BASE_URL + '/users/following',
	//         method: 'GET',
	//         json : true
	//     });
	// }
}
