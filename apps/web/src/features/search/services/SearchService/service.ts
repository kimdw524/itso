import type { Company } from '@/features/company/models';
import { http, pickRandomFromSet } from '@/shared/utils';

import type { JobPositionPreset } from '../../models';

export const service = {
  async getCompanies() {
    return http.get<Company[]>('/search/company');
  },

  async getPositionPresets() {
    return http.get<JobPositionPreset[]>('/search/position-preset');
  },

  async getRandomSearchKeywords(count: number) {
    const company = await this.getCompanies(),
      positionPreset = await this.getPositionPresets();
    const keywords = new Set([
      ...company.map((item) => item.name),
      ...positionPreset.map((item) => item.name),
    ]);

    return pickRandomFromSet(keywords, count);
  },
};
