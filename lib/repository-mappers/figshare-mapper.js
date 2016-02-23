const jsonLdCrosswalk = {
    // author field is an object mapping special case
    identifier: 'DOI',
    name: 'title',
    citation: undefined,
    email: undefined,
    type: 'file_type',
    keywords: 'tags',
    description: 'description',
    codeRepository: 'links',
    license: 'license',
    dateCreated: undefined
};

function parseAuthors(authors) {
    const jsonldAuthors = [];
    authors.forEach((author) => {
        jsonldAuthors.push( { 
            'name': author.author_name,
            '@type': 'Person'
        });
    });

    return jsonldAuthors;
}

export function getFigshareMetadata(jsonLd) {
    const figshareMetadata = {};
    for (let key in jsonLd) {
        if (jsonLdCrosswalk[key] && jsonLd.hasOwnProperty(key)) {
            figshareMetadata[jsonLdCrosswalk[key]] = jsonLd[key];
        }
    }
    
    return figshareMetadata;
}

export function getJsonLd(figshareMetadata) {
    const jsonLd = {
        "@context": "https://raw.githubusercontent.com/mbjones/codemeta/master/codemeta.jsonld",
        "@type": "Code"
    };

    jsonLd.author = parseAuthors(figshareMetadata.authors);

    for (let key in jsonLdCrosswalk) {
        let figshareAttribute = jsonLdCrosswalk[key];
        if (figshareAttribute && figshareMetadata.hasOwnProperty(figshareAttribute)) {
            if (figshareMetadata[figshareAttribute]) {
                jsonLd[key] = figshareMetadata[figshareAttribute];
            } 
        }     
    }

    return jsonLd;
}
