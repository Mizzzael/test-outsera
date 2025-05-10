import { TRange } from '@domains/Producer/schemes/TRange';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';
import { TProducerWinner } from '@domains/Producer/schemes/TProducerWinner';

const RecorrencyTrange = (data: ProducerRecorrency[][]): TRange => {
  const [max, min] = data;
  const maxItems: TProducerWinner[] = max.map(
    ({ producer, interval, yearEnd, yearBegin }) => {
      const pw: TProducerWinner = {
        producer: producer.name,
        interval: interval,
        followingWin: yearEnd,
        previousWin: yearBegin,
      };

      return pw;
    },
  );

  const minItems: TProducerWinner[] = min.map(
    ({ producer, interval, yearEnd, yearBegin }) => {
      const pw: TProducerWinner = {
        producer: producer.name,
        interval: interval,
        followingWin: yearEnd,
        previousWin: yearBegin,
      };

      return pw;
    },
  );

  const response: TRange = {
    max: maxItems,
    min: minItems,
  };

  return response;
};

export default RecorrencyTrange;
