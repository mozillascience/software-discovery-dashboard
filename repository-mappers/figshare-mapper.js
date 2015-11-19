const jsonLdCrosswalk = {
    name: 'title',
    citation: undefined,
    author: 'author',
    id: 'id',
    email: undefined,
    type: 'file_type',
    keywords: 'tags',
    description: 'Description',
    codeRepository: 'links',
    license: 'License',
    dateCreated: undefined
};

export function getFigshareMetadata(jsonLd) {
    const figshareMetadata = {};
    for (let key in jsonLd) {
        if (jsonLdCrosswalk[key] && jsonLd.hasOwnProperty(key)) {
            figshareMetadata[jsonLdCrosswalk[key]] = jsonLd[key];
        }
    }
    
    return figshareMetadata;
}
