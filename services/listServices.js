const BASE_URL = 'http://localhost:3000/api/lists';

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
			uri : BASE_URL + `/search/${searchString}`,
			method : 'POST',
			json : true
		})
	},

	getMostRecentLists : () => {
		return request({
			uri : BASE_URL + '/most_recent',
			method : 'GET',
			json : true
		})
	},

	getTrendingLists : () => {
		return request({
			uri : BASE_URL + '/trending',
			method : 'GET',
			json : true
		})
	},

	getListDataFromId : (list_id) => {
		return request({
			uri : BASE_URL + `/find/${list_id}`,
			method : 'GET',
			json : true
		})
	},

	lockList : (list_id) => {
		return request({
			uri : BASE_URL + `/lock/${list_id}`,
			method: 'PUT',
			json: true
		})
	},

    calculateOrdering : (list_id) => {
        return request({
            uri : BASE_URL + `/${list_id}`,
            method: 'GET',
            json: true
        })
    }
}
