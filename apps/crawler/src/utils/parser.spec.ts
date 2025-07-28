import { removeHTMLAttributes, stripHTML } from './parser';

describe('utils/parser', () => {
  describe('stripHTML', () => {
    it('중첩되지 않은 태그에서 text를 추출한다.', () => {
      expect(stripHTML('<div class="test">1</div>23')).toBe('1 23');
    });

    it('중첩된 태그에서 text를 추출한다.', () => {
      expect(
        stripHTML('<div class="test">1<h3>23</h3><h3>45</h3></div>67'),
      ).toBe('1 23 45 67');
    });
  });

  describe('removeHTMLAttributes', () => {
    it('html 태그의 attributes를 제거한다.', () => {
      expect(
        removeHTMLAttributes(
          '<div class="test">div<span class="" style="color: red">span</span></div>',
        ),
      ).toBe('<div>div<span>span</span></div>');
    });

    it('한글을 정상적으로 출력한다.', () => {
      expect(
        removeHTMLAttributes(
          '<div class="test">한글★<span class="" style="color: red">한글</span></div>',
        ),
      ).toBe('<div>한글★<span>한글</span></div>');
    });
  });
});
