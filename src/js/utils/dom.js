// 한 파일에는 하나의 객체만 있는 것이 좋기 때문에 분리

export const $ = (selector) => document.querySelector(selector);
// $ 표시, DOM 가져올 때 관용적으로 많이 사용한다
