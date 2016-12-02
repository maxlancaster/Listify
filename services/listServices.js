const BASE_URL = 'http://localhost:3000/lists';

var request = require('request-promise-native');

export default {
	createList : (content) => {
	    return request({
	        uri : BASE_URL + '/create',
	        method: 'POST',
	        json : true,
	        body : { content : content }
	    });
	},

	search : (searchString) => {
		return request({
			uri : BASE_URL + `/${searchString}`,
			method : 'POST',
			json : true
		})
	},

	getListDataFromId : (list_id) => {
		return request({
			uri : BASE_URL + `/${list_id}`,
			method : 'GET',
			json : true
		})
	}
}
