import React, { Component } from "react";
import { connect } from "react-redux";
import {
  capNhatSinhVienAciton,
  thayDoiInputAction,
  themSinhVienAction,
} from "../../redux/Action/BaiTapQuanLySinhVienAction";

class FormDangKySinhVien extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
  };
  
  handleChange = (event) => {
    let { name, value } = event.target;
    let newValues = { ...this.state.values };
    let newErrors = { ...this.state.errors };
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

    this.setState({
      values: newValues,
      errors: newErrors,
    });
  };

  // Kiểm tra hợp lệ
  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.checkValue()) {
      alert("Dữ liệu không hợp lệ");
      return;
    } else {
      // Gói this.state.values lại thành biến riêng
      // Khi hàm setState chạy:
      // + gán giá trị mới vào property values
      // + dispatch this.state.values lên redux
      // => setState chạy xong thì this.state.values mới thay đổi giá trị và render lại
      let { values } = this.state;
      this.setState(
        {
          values: {
            maSV: "",
            hoTen: "",
            soDienThoai: "",
            email: "",
          },
        },
        () => {
          this.props.themSinhVien(values);
        }
      );
    }
  };

  checkValue = () => {
    let valid = true;
    // Kiểm tra values khác rỗng
    for (let key in this.state.values) {
      if (this.state.values[key] === "") {
        valid = false;
        break;
      }
    }

    // kiểm tra errors bằng rỗng
    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "") {
        valid = false;
        break;
      }
    }
    return valid;
  };

  render() {
    let { maSV, hoTen, soDienThoai, email } = this.state.values;
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
                    disabled={this.props.disabledMaSV}
                    value={maSV}
                    className="form-control"
                    name="maSV"
                    onChange={this.handleChange}
                  />
                  <span style={{ color: "red" }}>{this.state.errors.maSV}</span>
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
                    {this.state.errors.soDienThoai}
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
                    {this.state.errors.hoTen}
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
                    {this.state.errors.email}
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
                    let { values } = this.state;
                    this.setState(
                      {
                        values: {
                          maSV: "",
                          hoTen: "",
                          soDienThoai: "",
                          email: "",
                        },
                      },
                      () => {
                        this.props.capNhatSinhVien(values);
                      }
                    );
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

  // ------- Thống nhất this.state.values và this.props.sinhVienChinhSua---

  // Đây là lifecycle TRẢ VỀ props cũ và state cũ trước khi render
  // Hàm này chạy sau render()
  // prevProps là Props từ redux truyền xuống ĐỂ render (giá trị TRƯỚC render)
  // this.props không phải prevProps vì this.props nhận giá trị SAU render
  // prevState chính là this.state TRƯỚC render
  componentDidUpdate(prevProps, prevState) {
    // Vòng lặp vô tận
    // sau setState -> render chạy lại -> componentDidUpdate chạy lại -> tiếp tục setState
    // => Phải dùng điều kiện ràng buộc khi nào mới setState ? => Khi maSV thay đổi

    // Sẽ sót trường hợp nếu user chỉnh sửa 2 lần liên tiếp 1 maSV
    // khi đó prevProps = this.props
    // => Xử lý trên redux
    if (prevProps.sinhVienChinhSua.maSV !== this.props.sinhVienChinhSua.maSV) {
      return this.setState({
        values: this.props.sinhVienChinhSua,
      });
    }
  }
}

const mapStateToProps = (state) => ({
  sinhVienChinhSua: state.BaiTapQuanLySinhVienReducer.sinhVienChinhSua,
  disabledThem: state.BaiTapQuanLySinhVienReducer.disabledThem,
  disabledCapNhat: state.BaiTapQuanLySinhVienReducer.disabledCapNhat,
  disabledMaSV: state.BaiTapQuanLySinhVienReducer.disabledMaSV,
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
