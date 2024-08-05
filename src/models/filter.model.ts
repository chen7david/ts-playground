import { z } from 'zod'

export const QueryParamFilter = z.object({
  limit: z.coerce.number().optional(),
  cursor: z.string().optional(),
  filterBy: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  sortBy: z
    .array(
      z.object({
        name: z.string(),
        order: z.enum(['ACS', 'DESC']),
      }),
    )
    .optional(),
  includeDeleted: z.coerce.boolean().optional(),
})

export type IQueryParamFilter = z.infer<typeof QueryParamFilter>

export const defaultQueryParamFilter = {
  limit: 10,
  sortBy: [{ name: 'created_by', order: 'ACS' }],
}
