import { z } from 'zod'

export const QueryParamFilter = z.object({
  filterBy: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  sortBy: z
    .array(
      z.object({
        name: z.string(),
        direction: z.enum(['ACS', 'DESC']),
      }),
    )
    .optional(),
  includeDeleted: z.coerce.boolean().optional(),
})
