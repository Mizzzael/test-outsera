import * as fs from 'node:fs';
import * as path from 'node:path';

const getSeeds = (): string[] => {
  const pathOfSeed = path.join(__dirname, '../../../seeds/');
  return fs.readdirSync(pathOfSeed);
};

export default getSeeds;
