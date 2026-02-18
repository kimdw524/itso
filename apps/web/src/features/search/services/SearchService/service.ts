import type { Company } from '@/features/company/models';
import { http } from '@/shared/utils';

import type { JobPositionPreset } from '../../models';

export const service = {
  async getCompanies() {
    return http.get<Company[]>('/search/company');
  },

  async getPositionPresets() {
    return http.get<JobPositionPreset[]>('/search/position-preset');
  },
};
