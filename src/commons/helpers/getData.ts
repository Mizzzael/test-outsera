import * as csvToJson from 'csvtojson';
import * as path from 'node:path';
import formatCsvDataToSave from '@/src/commons/helpers/formatCsvDataToSave';
import { TCSVData } from '@commons/types/TCSVData';

const getDataFromCsv = (fileName: string): Promise<TCSVData[]> => {
  const pathOfSeed = path.join(__dirname, '../../../seeds/', fileName);

  return new Promise((resolve) => {
    csvToJson({
      delimiter: ';',
    })
      .fromFile(pathOfSeed)
      .then((data) => {
        const dataFormatted = formatCsvDataToSave(data);
        resolve(dataFormatted);
      });
  });
};

export default getDataFromCsv;
