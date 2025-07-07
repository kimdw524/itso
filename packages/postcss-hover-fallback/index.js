const postcss = require('postcss');

module.exports = function () {
  return {
    postcssPlugin: 'postcss-hover-fallback',
    Once(root) {
      root.walkRules((rule) => {
        if (rule.selector.includes(':hover')) {
          const mediaHover = postcss.atRule({
            name: 'media',
            params: '(hover: hover) and (pointer: fine)',
          });
          mediaHover.append(rule.clone());

          const mediaTouch = postcss.atRule({
            name: 'media',
            params: '(pointer: coarse)',
          });
          const touchRule = rule.clone();
          touchRule.selector = touchRule.selector.replace(':hover', ':active');

          mediaTouch.append(touchRule);

          rule.parent.insertBefore(rule, mediaHover);
          rule.parent.insertBefore(rule, mediaTouch);

          rule.remove();
        }
      });
    },
  };
};

module.exports.postcss = true;
