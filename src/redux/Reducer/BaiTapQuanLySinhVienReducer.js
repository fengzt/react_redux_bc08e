import {
  CAP_NHAT_SINH_VIEN,
  CHINH_SUA_SINH_VIEN,
  THAY_DOI_INPUT,
  THAY_DOI_TIM_KIEM,
  THEM_SINH_VIEN,
  TIM_KIEM_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../Type/BaiTapQuanLySinhVienType";

const initialState = {
  mangSinhVien: [
    {
      maSV: "1",
      hoTen: "Nguyễn Văn A",
      soDienThoai: "0938111111",
      email: "nguyenvana@gmail.com",
    },
    {
      maSV: "2",
      hoTen: "Nguyễn Văn B",
      soDienThoai: "0938223232",
      email: "nguyenvanb@gmail.com",
    },
  ],
  mangSinhVienKhongTim: [],
  sinhVienChinhSua: {
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  },
  timKiem: "",
  disabledThem: false,
  disabledCapNhat: true,
  disabledMaSV: false,
};

const BaiTapQuanLySinhVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case THAY_DOI_INPUT: {
      let newSinhVien = { ...state.sinhVien };
      newSinhVien = action.sinhVien;
      state.sinhVien = newSinhVien;
      return { ...state };
    }

    case THEM_SINH_VIEN: {
      let kiemTraSinhVien = state.mangSinhVien.find(
        (sinhVien) => sinhVien.maSV === action.sinhVien.maSV
      );
      if (kiemTraSinhVien) {
        alert("Dữ liệu sinh viên đã tồn tại");
      } else {
        state.mangSinhVien = [...state.mangSinhVien, action.sinhVien];
      }
      return { ...state };
    }

    case XOA_SINH_VIEN: {
      let mangSinhVienCapNhat = [...state.mangSinhVien];
      mangSinhVienCapNhat = mangSinhVienCapNhat.filter(
        (sinhVien) => sinhVien.maSV !== action.maSV
      );
      state.mangSinhVien = mangSinhVienCapNhat;
      return { ...state };
    }

    case CHINH_SUA_SINH_VIEN: {
      state.disabledThem = true;
      state.disabledCapNhat = false;
      state.disabledMaSV = true;
      state.sinhVienChinhSua = action.sinhVien;
      state.sinhVienChinhSua = { ...state.sinhVienChinhSua };
      return { ...state };
    }

    case CAP_NHAT_SINH_VIEN: {
      state.disabledCapNhat = true;
      state.disabledThem = false;
      state.disabledMaSV = false;

      let mangSinhVienCapNhat = [...state.mangSinhVien];
      let index = mangSinhVienCapNhat.findIndex(
        (sinhVien) => sinhVien.maSV === action.sinhVien.maSV
      );
      if (index !== -1) {
        mangSinhVienCapNhat[index] = action.sinhVien;
      }
      state.mangSinhVien = mangSinhVienCapNhat;
      state.sinhVienChinhSua = {
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      };
      return { ...state };
    }

    case THAY_DOI_TIM_KIEM: {
      state.timKiem = action.timKiem;
      return { ...state };
    }

    case TIM_KIEM_SINH_VIEN: {
      let mangSinhVienCapNhat = [...state.mangSinhVien];

      if (action.timKiem !== "") {
        let timMaSV = mangSinhVienCapNhat.find(
          (sinhVien) => sinhVien.maSV === action.timKiem.trim()
        );
        let timHoTen = mangSinhVienCapNhat.find(
          (sinhVien) => sinhVien.hoTen === action.timKiem.trim()
        );
        let timSoDienThoai = mangSinhVienCapNhat.find(
          (sinhVien) => sinhVien.soDienThoai === action.timKiem.trim()
        );
        let timEmail = mangSinhVienCapNhat.find(
          (sinhVien) => sinhVien.email === action.timKiem.trim()
        );

        if (timMaSV) {
          mangSinhVienCapNhat = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.maSV === action.timKiem.trim()
          );
          state.mangSinhVienKhongTim = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.maSV !== action.timKiem.trim()
          );
        } else if (timHoTen) {
          mangSinhVienCapNhat = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.hoTen === action.timKiem.trim()
          );
          state.mangSinhVienKhongTim = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.hoTen !== action.timKiem.trim()
          );
        } else if (timSoDienThoai) {
          mangSinhVienCapNhat = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.soDienThoai === action.timKiem.trim()
          );
          state.mangSinhVienKhongTim = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.soDienThoai !== action.timKiem.trim()
          );
        } else if (timEmail) {
          mangSinhVienCapNhat = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.email === action.timKiem.trim()
          );
          state.mangSinhVienKhongTim = state.mangSinhVien.filter(
            (sinhVien) => sinhVien.email !== action.timKiem.trim()
          );
        } else {
          alert("Không tìm thấy !!!");
        }
        state.mangSinhVien = mangSinhVienCapNhat;
      } else {
        // action.timKiem === "" => Reload all state.mangSinhVien
        let flag = true;
        for (let i = 0; i < state.mangSinhVien.length; i++) {
          for (let j = 0; j < state.mangSinhVienKhongTim.length; j++) {
            if (
              state.mangSinhVienKhongTim[j].maSV === state.mangSinhVien[i].maSV
            ) {
              flag = false;
            }
          }
        }
        if (flag) {
          state.mangSinhVien = [
            ...state.mangSinhVienKhongTim,
            ...mangSinhVienCapNhat,
          ];
        } else {
          state.mangSinhVien = [...state.mangSinhVien];
        }
      }
      state.mangSinhVien = state.mangSinhVien.sort((svKeTiep, sv) => {
        return svKeTiep.maSV - sv.maSV;
      });
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default BaiTapQuanLySinhVienReducer;
