const stateDefault = {
  mangDatCuoc: [
    { ma: "keo", hinhAnh: "./img/gameOanTuXi/keo.png", datCuoc: false },
    { ma: "bua", hinhAnh: "./img/gameOanTuXi/bua.png", datCuoc: true },
    { ma: "bao", hinhAnh: "./img/gameOanTuXi/bao.png", datCuoc: false },
  ],
  ketQua: "I'm Ironman, I love you 3000 !!!",
  soBanThang: 0,
  soBanChoi: 0,
  computer: { ma: "keo", hinhAnh: "./img/gameOanTuXi/keo.png", datCuoc: false },
};

const BaiTapOanTuTiReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CHON_KEO_BUA_BAO": {
      // console.log(action.maCuoc);
      // Tạo ra mảng mới từ (mảng cũ) và (action.maCuoc) - từ user
      let mangCapNhat = [...state.mangDatCuoc];
      // Từ mảng sang các chuỗi độc lập dể duyệt mảng, nhờ hàm map
      mangCapNhat = mangCapNhat.map((kbb, index) => {
        if (kbb.ma === action.maCuoc) {
          return { ...kbb, datCuoc: true };
        }
        return { ...kbb, datCuoc: false };
      });
      state.mangDatCuoc = mangCapNhat;
      return { ...state };
    }

    case "RAN_DOM": {
      let soNgauNhien = Math.floor(Math.random() * 3);
      let randomComputer = state.mangDatCuoc[soNgauNhien];
      state.computer = randomComputer;
      return { ...state };
    }

    case "END_GAME":
      {
        let player = state.mangDatCuoc.find((kbb) => kbb.datCuoc);
        let computer = state.computer;
        switch (player.ma) {
          case "keo": {
            if (computer.ma === "keo") {
              state.ketQua = "hòa nhau rồi !!!";
            } else if (computer.ma === "bua") {
              state.ketQua = "thua sml !!!";
            } else {
              state.soBanThang += 1;
              state.ketQua = "I'm Ironman, I love you 3000 !!!";
            }
            break;
          }
          case "bua": {
            if (computer.ma === "bua") {
              state.ketQua = "hòa nhau rồi !!!";
            } else if (computer.ma === "bao") {
              state.ketQua = "thua sml !!!";
            } else {
              state.soBanThang += 1;
              state.ketQua = "I'm Ironman, I love you 3000 !!!";
            }
            break;
          }
          case "bao": {
            if (computer.ma === "bao") {
              state.ketQua = "hòa nhau rồi !!!";
            } else if (computer.ma === "keo") {
              state.ketQua = "thua sml !!!";
            } else {
              state.soBanThang += 1;
              state.ketQua = "I'm Ironman, I love you 3000 !!!";
            }
            break;
          }
          default:
            state.ketQua = "I'm Ironman, I love you 3000 !!!";
        }
      }
      state.soBanChoi += 1;
      return { ...state };
    case "RESET": {
      state.mangDatCuoc = [
        { ma: "keo", hinhAnh: "./img/gameOanTuXi/keo.png", datCuoc: false },
        { ma: "bua", hinhAnh: "./img/gameOanTuXi/bua.png", datCuoc: true },
        { ma: "bao", hinhAnh: "./img/gameOanTuXi/bao.png", datCuoc: false },
      ];
      state.ketQua = "I'm Ironman, I love you 3000 !!!";
      state.soBanThang = 0;
      state.soBanChoi = 0;
      state.computer = {
        ma: "keo",
        hinhAnh: "./img/gameOanTuXi/keo.png",
        datCuoc: false,
      };
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default BaiTapOanTuTiReducer;
