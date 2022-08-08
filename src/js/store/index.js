// 한 파일에는 하나의 객체만 있는 것이 좋기 때문에 분리

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return localStorage.getItem("menu");
  },
};

export default store;
