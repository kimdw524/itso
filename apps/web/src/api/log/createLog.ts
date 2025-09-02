import { fetcher } from '../fetcher';

export interface CreateLogRequest {
  type: 'apply' | 'share';
  target: string | number;
}

export const createLogo = async ({ type, target }: CreateLogRequest) => {
  await fetcher('/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    throwOnError: false,
    body: JSON.stringify({ type, target: String(target) }),
  });

  return;
};
