/*
step1 요구사항 구현을 위한 전략 - 요구사항을 명확하게 해놓는 것이 중요하다.

TODO 메뉴 추가
메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
메뉴의 이름을 입력받고 확인 버튼을 클릭하면 메뉴를 추가한다
추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`안에 삽입해야 한다.
총 메뉴 갯수를 count 하여 상단에 보여준다
메뉴가 추가되고 나면, input은 빈 값으로 초기화 한다
사용자 입력값이 빈 값이라면 추가되지 않는다.

TODO 메뉴 수정
메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다
모달창에서 신규메뉴명을 입력받고, 확인버튼을 누르면 메뉴가 수정된다

TODO 메뉴 삭제
메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌(confirm) 모달창이 뜬다.
확인 버튼을 클릭하면 메뉴가 삭제된다.
총 메뉴 갯수를 count하여 상단에 보여준다
*/

/* 

Step2 요구사항

TODO localStorage Read & Write
- localStorage에 데이터를 저장한다
- localStorage에 있는 데이터를 읽어온다

TODO 카테고리별 메뉴판 관리
- 에스프레소 메뉴판 관리
- 프라푸치노 메뉴판 관리
- 블렌디드 메뉴판 관리
- 티바나 메뉴판 관리
- 디저트 메뉴판 관리 

TODO 페이지 접근시 최초 데이터 Read & Rendering
- 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다
- 에스프레소 메뉴를 페이지에 그려준다 

- 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
- 품절 버튼을 추가한다
- 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다
- 품절 해당 메뉴의 상태값이 페이지에 그려진다 
- 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값의 sold-out을 추가한다

*/

const $ = (selector) => document.querySelector(selector);
// $ 표시, DOM 가져올 때 관용적으로 많이 사용한다

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return localStorage.getItem("menu");
  },
};

function App() {
  // 상태는 변할 수 있는 데이터 , 이 앱에서 변하는 것이 무엇인가 - 메뉴명

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = JSON.parse(store.getLocalStorage());
    }
    render();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
        수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
        삭제
        </button>
      </li>
    `;
      })
      .join(""); // 배열형태로 있던 li 태그들이 하나의 마크업으로 합쳐진다;

    $("#menu-list").innerHTML = template;

    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $("#menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    // form tag 때문에 엔터키 쳤을 때 새로고침 된다.
    // form tag가 자동으로 전송하는 기능을 브라우저에서 제공하기 때문

    const menuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu); // 상태가 변경되었을 때 로컬 스토리지에 저장
    render();
    $("#menu-name").value = "";
  };

  const updateMenuName = (e) => {
    // 이벤트 위임으로 수정, 삭제 기능 구현
    // 해당 부분 시간 지나면 헷갈릴 수도 있기 때문에 함수로 분리해준다

    const menuId = e.target.closest("li").dataset.menuId; //dataset으로 html dataset 속성 접근 가능
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);

    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId; //dataset으로 html dataset 속성 접근 가능
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);

      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  // 아직 수정 버튼이 없기 때문에 li 태그에 이벤트 위임한다
  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      // element의 텍스트의 값으로 비교하기 보다는 가능하면 element가 가진 속성들을 이용하는 것이 좋다
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // form 태그가 자동으로 전송되는 것을 막아준다.
  });

  $("#menu-submit-button").addEventListener("click", addMenuName);

  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });

  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;

      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;

      render();
    }
  });
}

const app = new App();
app.init();
