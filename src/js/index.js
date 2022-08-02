// step1 요구사항 구현을 위한 전략 - 요구사항을 명확하게 해놓는 것이 중요하다.

// TODO 메뉴 추가
// 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
// 메뉴의 이름을 입력받고 확인 버튼을 클릭하면 메뉴를 추가한다
// 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`안에 삽입해야 한다.
// 총 메뉴 갯수를 count 하여 상단에 보여준다
// 메뉴가 추가되고 나면, input은 빈 값으로 초기화 한다
// 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다
// 모달창에서 신규메뉴명을 입력받고, 확인버튼을 누르면 메뉴가 수정된다

// TODO 메뉴 삭제
// 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌(confirm) 모달창이 뜬다.
// 확인 버튼을 클릭하면 메뉴가 삭제된다.
// 총 메뉴 갯수를 count하여 상단에 보여준다

const $ = (selector) => document.querySelector(selector);
// $ 표시, DOM 가져올 때 관용적으로 많이 사용한다

function App() {
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 아직 수정 버튼이 없기 때문에 li 태그에 이벤트 위임한다
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      // element의 텍스트의 값으로 비교하기 보다는 가능하면 element가 가진 속성들을 이용하는 것이 좋다

      const $menuName = e.target.closest("li").querySelector(".menu-name");

      const menuName = $menuName.innerText;
      const updatedMenuName = prompt("메뉴명을 수정하세요.", menuName);

      $menuName.innerText = updatedMenuName;
    }

    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말 삭제하시겠습니까?")) {
        e.target.closest("li").remove();
        updateMenuCount();
      }
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // form 태그가 자동으로 전송되는 것을 막아준다.
  });

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    // form tag 때문에 엔터키 쳤을 때 새로고침 된다.
    // form tag가 자동으로 전송하는 기능을 브라우저에서 제공하기 때문

    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `
					<li class="menu-list-item d-flex items-center py-2">
						<span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
						<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
						수정
						</button>
						<button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
						삭제
						</button>
					</li>
				`;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
