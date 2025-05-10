import { z } from 'zod';

export const SProducerWinner = z.object({
  producer: z.string(),
  interval: z.number(),
  previousWin: z.number(),
  followingWin: z.number(),
});

export type TProducerWinner = z.infer<typeof SProducerWinner>;
