export const getKSTDate = (
  params?: ConstructorParameters<typeof Date>[0],
): Date => {
  const KST_DIFF = 9 * 60 * 60 * 1000;

  const now = params === undefined ? new Date() : new Date(params);
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  return new Date(utc + KST_DIFF);
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
