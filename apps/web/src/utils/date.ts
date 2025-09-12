export const getKSTDate = (
  params?: ConstructorParameters<typeof Date>[0],
): Date => {
  const KST_DIFF = 9 * 60 * 60 * 1000;

  const now = params === undefined ? new Date() : new Date(params);
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  return new Date(utc + KST_DIFF);
};

export const fromKSTDate = (
  params?: ConstructorParameters<typeof Date>[0],
): Date => {
  const now = params === undefined ? new Date() : new Date(params);
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  return new Date(utc);
};

export const getTimeSince = (date: Date) => {
  const diff = getKSTDate().getTime() - date.getTime();

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) return '방금 전';
  if (diff < hour) return `${Math.floor(diff / minute)}분 전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`;
  if (diff < week) return `${Math.floor(diff / day)}일 전`;
  if (diff < month) return `${Math.floor(diff / week)}주 전`;
  if (diff < year) return `${Math.floor(diff / month)}개월 전`;
  return `${Math.floor(diff / year)}년 전`;
};

export const formatTime = (isoString: string): string => {
  const date = getKSTDate(isoString);

  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yy}.${mm}.${dd} ${hh}:${min}`;
};

export const getDday = (isoString: string): string => {
  const targetDate = getKSTDate(isoString);

  const today = getKSTDate();
  today.setHours(0, 0, 0, 0);

  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays >= 0) {
    return `D-${diffDays}`;
  }
  return `D+${Math.abs(diffDays)}`;
};
