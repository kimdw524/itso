import type { CursorPaginatedResponse } from '@/api/types';
import { http } from '@/utils/http';

import type { Company } from '../../models';

export const service = {
  async getCompanyList(params: {
    orderBy?: 'name' | 'bookmarks';
    cursor?: string;
    limit?: number;
  }) {
    return http.get<CursorPaginatedResponse<Company, string>>('/company', {
      params,
    });
  },
};
