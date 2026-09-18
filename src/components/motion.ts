export const aeonEase = [0.22, 1, 0.36, 1] as const;

/**
 * 滚动入场视口设置。
 *
 * amount: 'some' —— 只要露出一像素就触发。
 *   之前用 amount: 0.3，对于"沿革"这种很高的区块，
 *   在笔记本屏幕上永远凑不满 30% 可见面积，动画就一直不触发、
 *   内容停在 opacity: 0，看起来就是"没有加载"。
 *
 * once: false —— 向上滚回来时也要重放，而不是只播一次。
 *
 * margin —— 底部留 10% 余量，让触发点落在视线下方一点，
 *   避免元素刚贴到屏幕边缘就开始动。
 */
export const inViewViewport = {
  once: false,
  amount: 'some',
  margin: '0px 0px -10% 0px',
} as const;

export const fadeUpTransition = {
  duration: 0.7,
  ease: aeonEase,
} as const;
