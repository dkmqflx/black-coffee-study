const BASE_URL = "http://localhost:3000/api";

const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },

  PUT(data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
      // data 없으면 데이터 안보낸다
      // 품절 요청을 보낸 후, 네트워크 탭에서 확인해보면 payload 항목이 없다
    };
  },

  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(error);
  }
  return response.json();
  //.then((response) => response.json());
  // 응답 객체에서 서버에서 내려준 데이터를 받으려면 .json()을 사용한다
};

const requestWithoutJson = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(error);
  }
};

const MenuApi = {
  getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },

  createMenu(category, name) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },

  updateMenu(category, name, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },

  toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },

  deleteMenu(category, menuId) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default MenuApi;
