jest.dontMock('../datacite-mapper');
import { convertToDataCiteSchema } from '../datacite-mapper';
const mockJsonLd = { keywords: ['word1', 'word2'] }

describe('datacite-mapper', function() {
	
    it('converts jsonLd formatted data to datacite formatted data', function() {
        const dataCiteMetadata = convertToDataCiteSchema(mockJsonLd);
        expect(dataCiteSchema).toEqual({ Subject: ['word1', 'word2'] });
    });

});
