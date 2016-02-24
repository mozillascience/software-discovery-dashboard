import { join } from 'path';

const file = join(__dirname, '/authconfig.json');

export function getFigshareAuth() {
    return new Promise((resolve, reject) => (
    readFile(file, (err, data) => (
      err ? reject(err) : resolve(data)
    ))
  ));
};
