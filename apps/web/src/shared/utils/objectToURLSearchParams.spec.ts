import { objectToURLSearchParams } from './objectToURLSearchParams';

describe('objectToURLSearchParams', () => {
  it('원시 타입 값을 쿼리 파라미터로 변환한다', () => {
    const searchParams = objectToURLSearchParams({
      page: 3,
      query: 'react',
      enabled: true,
    });

    expect(searchParams.toString()).toBe('page=3&query=react&enabled=true');
  });

  it('배열 값은 같은 키로 반복 추가한다', () => {
    const searchParams = objectToURLSearchParams({
      tag: ['react', 'typescript'],
      page: 1,
    });

    expect(searchParams.getAll('tag')).toEqual(['react', 'typescript']);
    expect(searchParams.get('page')).toBe('1');
  });

  it('null과 undefined 값은 제외한다', () => {
    const searchParams = objectToURLSearchParams({
      query: 'react',
      empty: null,
      none: undefined,
    });

    expect(searchParams.toString()).toBe('query=react');
  });
});
