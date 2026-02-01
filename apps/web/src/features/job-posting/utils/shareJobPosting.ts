import type { JobPosting } from '../models';

export const shareJobPosting = async (jobPosting: JobPosting) => {
  try {
    await navigator.share({
      title: jobPosting.title,
      url: `/post/${jobPosting.id}`,
    });
  } catch {
    alert('공유 기능을 지원하지 않는 브라우저입니다.');
  }
};
