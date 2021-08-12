import { CAP_NHAT_SINH_VIEN, CHINH_SUA_SINH_VIEN, THAY_DOI_INPUT, THAY_DOI_TIM_KIEM, THEM_SINH_VIEN, TIM_KIEM_SINH_VIEN, XOA_SINH_VIEN } from "../Type/BaiTapQuanLySinhVienType";

export const thayDoiInputAction = (sinhVien) => ({
  type: THAY_DOI_INPUT,
  sinhVien,
});

export const themSinhVienAction = (sinhVien) => ({
  type: THEM_SINH_VIEN,
  sinhVien,
});

export const capNhatSinhVienAciton = (sinhVien) => ({
  type: CAP_NHAT_SINH_VIEN,
  sinhVien,
});

export const xoaSinhVienAction = (maSV) => ({
  type: XOA_SINH_VIEN,
  maSV,
});

export const chinhSuaSinhVienAction = (sinhVien) => ({
  type: CHINH_SUA_SINH_VIEN,
  sinhVien,
});

export const thayDoiTimKiemAction = (timKiem) => ({
  type: THAY_DOI_TIM_KIEM,
  timKiem,
});

export const timKiemSinhVienAction = (timKiem) => ({
  type: TIM_KIEM_SINH_VIEN,
  timKiem,
});

