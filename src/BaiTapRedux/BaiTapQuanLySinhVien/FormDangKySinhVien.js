import React, { Component } from "react";
import { connect } from "react-redux";
import {
  capNhatSinhVienAciton,
  thayDoiInputAction,
  themSinhVienAction,
} from "../../redux/Action/BaiTapQuanLySinhVienAction";

class FormDangKySinhVien extends Component {
  handleChange = (event) => {
    let { name, value } = event.target;
    let newValues = { ...this.props.sinhVien.values };
    let newErrors = { ...this.props.sinhVien.errors };
    let messageError = "";
    let regex;
    let attriValue = "";

    newValues[name] = value;
    newErrors[name] = messageError;

    // Kiểm tra rỗng
    if (value.trim() === "") {
      messageError = name + " không được để trống !!!";
    }

    // Kiểm tra email
    if (event.target.getAttribute("typeemail")) {
      attriValue = event.target.getAttribute("typeemail");
      regex =
        /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@]{2,})$/i;
    }

    if ((attriValue === "email") & (value !== "")) {
      if (!regex.test(value)) {
        messageError = name + " phải đúng định dạng !!!";
      }
    }

    // Kiểm tra số điện thoại
    if (event.target.getAttribute("typephone")) {
      attriValue = event.target.getAttribute("typephone");
      regex = /^\d+$/;
    }

    if ((attriValue === "phone") & (value !== "")) {
      if (!regex.test(value)) {
        messageError = name + " phải đúng định dạng !!!";
      }
    }

    newErrors[name] = messageError;

    const sinhVien = {
      values: newValues,
      errors: newErrors,
    };
    this.props.thayDoiInput(sinhVien);
  };

  // Kiểm tra hợp lệ
  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.checkValue()) {
      alert("Dữ liệu không hợp lệ");
      return;
    } else {
      this.props.themSinhVien(this.props.sinhVien.values);
    }
  };

  checkValue = () => {
    let valid = true;
    // Kiểm tra values khác rỗng
    for (let key in this.props.sinhVien.values) {
      if (this.props.sinhVien.values[key] === "") {
        valid = false;
        break;
      }
    }

    // kiểm tra errors bằng rỗng
    for (let key in this.props.sinhVien.errors) {
      if (this.props.sinhVien.errors[key] !== "") {
        valid = false;
        break;
      }
    }
    return valid;
  };

  render() {
    let { maSV, hoTen, soDienThoai, email } = this.props.sinhVien.values;
    return (
      <form className="mt-4 container form-group" onSubmit={this.handleSubmit}>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <p>Mã SV</p>
                  <input
                    value={maSV}
                    className="form-control"
                    name="maSV"
                    onChange={this.handleChange}
                  />
                  <span style={{ color: "red" }}>
                    {this.props.sinhVien.errors.maSV}
                  </span>
                </div>
                <div className="mb-3">
                  <p>Số điện thoại</p>
                  <input
                    value={soDienThoai}
                    onChange={this.handleChange}
                    className="form-control"
                    name="soDienThoai"
                    typephone="phone"
                  />
                  <span style={{ color: "red" }}>
                    {this.props.sinhVien.errors.soDienThoai}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <p>Họ tên</p>
                  <input
                    value={hoTen}
                    onChange={this.handleChange}
                    className="form-control"
                    name="hoTen"
                  />
                  <span style={{ color: "red" }}>
                    {this.props.sinhVien.errors.hoTen}
                  </span>
                </div>
                <div className="mb-3">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={this.handleChange}
                    className="form-control"
                    name="email"
                    typeemail="email"
                  />
                  <span style={{ color: "red" }}>
                    {this.props.sinhVien.errors.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                disabled={this.props.disabledThem}
                type="submit"
                className="btn btn-success mr-3 font-weight-bold"
              >
                Thêm sinh viên
              </button>
              <button
                disabled={this.props.disabledCapNhat}
                type="button"
                onClick={() => {
                  if (!this.checkValue()) {
                    alert("Dữ liệu không hợp lệ");
                    return;
                  } else {
                    this.props.capNhatSinhVien(this.props.sinhVien.values);
                  }
                }}
                className="btn btn-info mr-3 font-weight-bold"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  sinhVien: state.BaiTapQuanLySinhVienReducer.sinhVien,
  disabledThem: state.BaiTapQuanLySinhVienReducer.disabledThem,
  disabledCapNhat: state.BaiTapQuanLySinhVienReducer.disabledCapNhat,
});

const mapDispatchToProps = (dispatch) => ({
  thayDoiInput: (sinhVien) => {
    dispatch(thayDoiInputAction(sinhVien));
  },
  themSinhVien: (sinhVien) => {
    dispatch(themSinhVienAction(sinhVien));
  },
  capNhatSinhVien: (sinhVien) => {
    dispatch(capNhatSinhVienAciton(sinhVien));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDangKySinhVien);
