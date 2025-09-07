import { http } from '@/utils/http';

export const service = {
  async create({
    type,
    target,
  }: {
    type: 'apply' | 'share';
    target: string | number;
  }) {
    return http.post<void>('/log', {
      type,
      target: String(target),
    });
  },
};
