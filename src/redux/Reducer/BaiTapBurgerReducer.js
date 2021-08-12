const burgerState = {
  burger: { salad: 1, cheese: 1, beef: 1 },
  menu: {
    salad: 10,
    cheese: 20,
    beef: 55,
  },
  total: 85,
};

// Đối với thuộc tính cơ bản: total
// Khi xử lý, không cần tạo ra totalUpdate, redux sẽ gán trực tiếp

// Đối với thuộc tính chứa mảng || chuỗi || đối tượng
// Khi xử lý, phải tạo ra mảng update thì redux mới hiểu có sự thay đổi

// Lưu ý: redux chỉ render lại giao diện <=> redux nhận thấy sự thay đổi trong state

const BaiTapBurgerReducer = (state = burgerState, action) => {
  // console.log(action);
  switch (action.type) {
    case "THAY_DOI_MON": {
      let { propsMenu, heSo } = action;
      //   console.log("menu", propsMenu, "heSo", heSo);
      let burgerUpdate = { ...state.burger };
      burgerUpdate[propsMenu] += heSo;
      if (burgerUpdate[propsMenu] < 0) {
        // alert("Số lượng tối thiểu bằng 0");
        burgerUpdate[propsMenu] = 0;
      }
      state.total += heSo * state.menu[propsMenu];
      state.burger = burgerUpdate;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default BaiTapBurgerReducer;
