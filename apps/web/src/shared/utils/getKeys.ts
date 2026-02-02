/**
 * type을 유지하면서 object의 keys를 반환하는 함수
 */
export const getKeys = <T extends object>(object: T) => {
  return Object.keys(object) as (keyof T)[];
};
