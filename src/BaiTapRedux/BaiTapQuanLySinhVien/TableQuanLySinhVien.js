import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CHINH_SUA_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../../redux/Type/BaiTapQuanLySinhVienType";

class TableQuanLySinhVien extends Component {
  handleChangeSearch = (event) => {
    let { value } = event.target;
    this.props.thayDoiTimKiem(value);
  };
  handleSubmitSearch = (event) => {
    event.preventDefault();
    this.props.timKiemSinhVien(this.props.timKiem);
  };
  render() {
    let { mangSinhVien } = this.props;
    return (
      <div className="container">
        <table className="table">
          <thead className="bg-dark text-white">
            <tr>
              <td style={{ verticalAlign: "middle" }}>Mã SV</td>
              <td style={{ verticalAlign: "middle" }}>Họ tên</td>
              <td style={{ verticalAlign: "middle" }}>Số điện thoại</td>
              <td style={{ verticalAlign: "middle" }}>Email</td>
              <td>
                <form className="form-inline my-2 my-lg-0 justify-content-end">
                  <input
                    onChange={this.handleChangeSearch}
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                  />
                  <button
                    onClick={this.handleSubmitSearch}
                    className="btn btn-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </td>
            </tr>
          </thead>
          <tbody>
            {mangSinhVien.map((sinhVien, index) => {
              return (
                <tr key={index}>
                  <td style={{ verticalAlign: "middle" }}>{sinhVien.maSV}</td>
                  <td style={{ verticalAlign: "middle" }}>{sinhVien.hoTen}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {sinhVien.soDienThoai}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{sinhVien.email}</td>
                  <td
                    className="text-right"
                    style={{ verticalAlign: "middle" }}
                  >
                    <button
                      onClick={() => {
                        this.props.xoaSinhVien(sinhVien.maSV);
                      }}
                      className="btn btn-outline-danger mr-3"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => {
                        this.props.chinhSuaSinhVien(sinhVien);
                      }}
                      className="btn btn-outline-primary"
                    >
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mangSinhVien: state.BaiTapQuanLySinhVienReducer.mangSinhVien,
  timKiem: state.BaiTapQuanLySinhVienReducer.timKiem,
});

const mapDitpatchToProps = (dispatch) => ({
  xoaSinhVien: (maSV) => {
    const action = {
      type: XOA_SINH_VIEN,
      maSV,
    };
    dispatch(action);
  },
  chinhSuaSinhVien: (sinhVien) => {
    const action = {
      type: CHINH_SUA_SINH_VIEN,
      sinhVien,
    };
    dispatch(action);
  },
  thayDoiTimKiem: (timKiem) => {
    const action = {
      type: "THAY_DOI_TIM_KIEM",
      timKiem,
    };
    dispatch(action);
  },
  timKiemSinhVien: (timKiem) => {
    const action = {
      type: "TIM_KIEM_SINH_VIEN",
      timKiem,
    };
    dispatch(action);
  },
});

export default connect(
  mapStateToProps,
  mapDitpatchToProps
)(TableQuanLySinhVien);
