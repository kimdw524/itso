import { parseQueryString, serializeQueryString } from './queryString';

describe('serializeQueryString', () => {
  it('배열로 된 value를 전달하면 여러 개의 query string이 추가된다.', () => {
    const result = serializeQueryString({ a: 1, b: [2, '3'] });
    expect(result).toBe('a=1&b=2&b=3');
  });

  it('delimiter가 주어지면 배열로 된 값을 delimiter로 분리한다.', () => {
    const result = serializeQueryString({ a: 1, b: [2, '3'] }, ',');
    expect(result).toBe('a=1&b=2,3');
  });
});

describe('parseQueryString', () => {
  it('같은 key의 query string이 여러 개 존재할 경우 배열로 반환한다.', () => {
    const result = parseQueryString('a=1&b=2&b=3&c=4');
    expect(result).toEqual({ a: '1', b: ['2', '3'], c: '4' });
  });

  it('key의 value가 비어 있는 경우도 변환한다.', () => {
    const result = parseQueryString('a=&b=');
    expect(result).toEqual({ a: '', b: '' });
  });

  it('delimter가 주어지면 delimiter를 기준으로 배열을 만든다.', () => {
    const result = parseQueryString('a=1,2,3', ',');
    expect(result).toEqual({ a: ['1', '2', '3'] });
  });
});
