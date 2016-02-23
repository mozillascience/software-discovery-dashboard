import { get } from 'request';
import { getFigshareAuth } from '../repository-auth/auth-store';
import { getFigshareMetadata, getJsonLd } from '../repository-mappers/figshare-mapper';

const searchUrl = 'http://api.figshare.com/v1/articles/search';

export function searchFigshare(jsonLd) {
    const figshareMetadata = getFigshareMetadata(jsonLd);
    const queryParams = {
        has_title: figshareMetadata.title,
        has_tag: figshareMetadata.tags,
        has_author: figshareMetadata.author
    };

    const searchWords = [];
    for (let key in jsonLd) {
        if (jsonLd[key] && jsonLd.hasOwnProperty(key)) {
            searchWords.push(jsonLd[key]);
        }
    }

    queryParams.search_for = searchWords.join(' ');

    return new Promise((resolve, reject) => {
        get({ url: searchUrl, qs: queryParams, oauth: getFigshareAuth(), json: true }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });

}
