const BASE_URL = 'http://localhost:3000/rankings';

var request = require('request-promise-native');

export default {
	submitOriginalRanking : (content) => {
	    return request({
	        uri : BASE_URL + '/edit',
	        method: 'POST',
	        json : true,
	        body : { content : content }
	    });
	},

	populateStandardRankingPage : () => {
		return request({
			uri : BASE_URL + '/:consensus_id',
			method : 'GET',
			json : true,
			body : {
				// To DO
			}
		});
	},

	loadEditPage : (consensus_id) => {
		return request({
			uri : BASE_URL + '/edit' + `/${consensus_id}`,
			method : 'GET',
			json : true
		})
	}
	// ,
	// getConsensusById : (consensus_id) => {
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