export default function getL2Article(id) {
  return new Promise((resolve, reject) => (
    get({
      url: strFormat('https://api.figshare.com/v2/articles/%s', id),
      json: true,
    }, (error, response, body) => {
      if (response.statusCode === 200) resolve(body);
      if (error) reject(error);
      const errMsg = strFormat('Unable to perform Figshare article lookup: (%d), "%s"',
        response.statusCode, response.body.message);
      reject(new Error(errMsg));
    })
  ));
}
