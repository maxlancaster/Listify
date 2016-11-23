const BASE_URL = 'http://localhost:3000/rankings';

var request = require('request-promise-native');

export default {
	submitOriginalRanking : (content) => {
		console.log(content);
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
			metho : 'GET',
			json : true,
			body : {

			}
		});
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