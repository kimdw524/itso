export const formatExperienceRange = (min: number, max: number): string => {
  if (min !== 0 && max !== 99) {
    return `경력 ${min}~${max}년`;
  } else if (min === 0 && max === 0) {
    return '신입';
  } else if (min !== 0) {
    return `경력 ${min}년 이상`;
  } else if (max !== 99) {
    return `경력 ${max}년 이하`;
  } else {
    return '경력 무관';
  }
};
