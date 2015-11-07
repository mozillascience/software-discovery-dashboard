import * as request from 'Request';
import { convertToDataCiteSchema } from '../repository-mappers/datacite-mapper';

const dataCiteSearchUrl = 'search.datacite.org/api';

const createDataCiteQuery = function(jsonLd) {
	const dataCiteSchemaData = convertToDataCiteSchema(jsonLd);
	const dataCiteKeyValueList = [];
	for (key in dataCiteSchemaData) {
		if (dataCiteSchemaData.hasOwnProperty(key)) {
			dataCiteKeyValueList.push(key + ':' + dataCiteSchemaData[key]);
		}
	}
	return dataCiteSearchUrl + '?q=' + dataCiteKeyValueList.join(' AND ');
}

module.exports = {

	get: function(jsonLd) {
		return new Promise(function(resolve, reject) {
			request('', function(error, response, body) {
				if (!error && response.statusCode === 200) {
					resolve(response);
				} else {
					reject(error);
				}
			});
		});
	}

}
