import { createSearchParamsSchema } from '@kimdw-rtk/react-search-params';
import * as z from 'zod';

import { validateParams } from './validateParams';

describe('validateParams', () => {
  const schema = createSearchParamsSchema<{
    jobIds: number[];
    employmentTypes: number[];
  }>({
    defaultValue: {},
    partial: true,
    arrayParams: ['jobIds', 'employmentTypes'],
    validate(params) {
      return z
        .object({
          title: z.string().default(''),
          page: z.coerce.number().default(1),
          jobIds: z.array(z.coerce.number()).default([]),
          employmentTypes: z.array(z.coerce.number()).default([]),
        })
        .parse(params);
    },
  });

  it('deserializes scalar params and ignores undefined values', () => {
    const result = validateParams(schema, {
      title: 'frontend',
      page: '3',
      ignored: undefined,
    });

    expect(result).toEqual({
      title: 'frontend',
      page: 3,
      jobIds: [],
      employmentTypes: [],
    });
  });

  it('splits comma-delimited values into arrays for declared array params', () => {
    const result = validateParams(schema, {
      jobIds: '1,2,3',
      employmentTypes: '4,5',
    });

    expect(result).toEqual({
      title: '',
      page: 1,
      jobIds: [1, 2, 3],
      employmentTypes: [4, 5],
    });
  });

  it('normalizes repeated query keys into arrays for declared array params', () => {
    const result = validateParams(schema, {
      jobIds: ['1', '2', '3'],
      employmentTypes: ['4'],
    });

    expect(result).toEqual({
      title: '',
      page: 1,
      jobIds: [1, 2, 3],
      employmentTypes: [4],
    });
  });
});
