import express from 'express';
import { searchFigshare } from '../../repository-clients/figshare-client';
const router = express.Router();

const jsonLdAttributes = ['name', 'citation', 'author', 
        'id', 'keywords', 'email', 'type', 'description', 
        'codeRepository', 'license', 'dateCreated'];

function getJsonLdFromQueryParams(queryParams) {
    const jsonLd = {};
    for (let key of jsonLdAttributes) {
        if (queryParams[key]) {
            jsonLd[key] = queryParams[key];
        }
    }

    return jsonLd;
}

router.get('/', (req, res, next) => {
    const jsonLd = getJsonLdFromQueryParams(req.query);
    console.log(jsonLd);

	switch (req.query.repos) {
		case 'figshare':
			searchFigshare(jsonLd).then((result) => {
				res.send(result);
			}).catch((error) => {
				throw error;
			});
	}
});

export default router;
