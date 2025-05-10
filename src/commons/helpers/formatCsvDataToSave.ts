import { TCSVData, TCSVRow } from '@commons/types/TCSVData';
import { TMovie } from '@commons/types/TMovie';
import calcMaxInterval from '@commons/helpers/calcMaxInterval';

const formatCsvDataToSave = (data: any[]): TCSVData[] => {
  const rows = data as TCSVRow[];
  const Producers = new Set<string>();

  rows.forEach(({ producers }) => {
    if (/(,)+/g.test(producers)) {
      const producersList = producers.split(',');
      producersList.forEach((name) => {
        Producers.add(name.trim().replace('and ', ''));
      });
    } else {
      Producers.add(producers);
    }
  });

  const producersData: TCSVData[] = [];

  Producers.forEach((producer: string) => {
    const movies: TMovie[] = rows
      .filter(({ producers }) => producers.includes(producer))
      .map(({ year, title, studios, winner }) => ({
        year: parseInt(year, 10),
        title,
        studios,
        winner: !winner ? false : winner.trim() === 'yes',
      }));

    const producerData: TCSVData = {
      producer,
      movies,
      winsInterval: calcMaxInterval(movies),
    };

    producersData.push(producerData);
  });

  return producersData;
};

export default formatCsvDataToSave;
