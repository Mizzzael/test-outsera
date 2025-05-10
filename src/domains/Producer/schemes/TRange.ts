import { z } from 'zod';

export const TRangeBase = z.object({
  max: z.array(
    z.object({
      producer: z.string(),
      interval: z.number(),
      previousWin: z.number(),
      followingWin: z.number(),
    }),
  ),
  min: z.array(
    z.object({
      producer: z.string(),
      interval: z.number(),
      previousWin: z.number(),
      followingWin: z.number(),
    }),
  ),
});

export type TRange = z.infer<typeof TRangeBase>;
