import express from 'express';
import { searchFigshare } from '../repository-clients/figshare-client';
import { getJsonLd } from '../repository-mappers/figshare-mapper';
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

function concatClientResults(results) {
    return results.map(getJsonLd);
}

router.get('/', (req, res, next) => {
    const jsonLd = getJsonLdFromQueryParams(req.query);

    switch (req.query.repos) {
        case 'figshare':
            searchFigshare(jsonLd).then((result) => {
                res.send(concatClientResults(result.items));
            }).catch((error) => {
                throw error;
            });
    }
});

export default router;
