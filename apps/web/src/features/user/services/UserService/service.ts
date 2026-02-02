import { http } from '@/shared/utils/http';

export const service = {
  async getInfo(): Promise<{
    email: string;
    profile: string;
  } | null> {
    try {
      return await http.get<{
        email: string;
        profile: string;
      }>('/user', { throwOnError: true });
    } catch {
      return null;
    }
  },

  async signOut() {
    return http.delete('/auth');
  },
};
