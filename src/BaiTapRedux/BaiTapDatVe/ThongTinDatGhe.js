import React, { Component } from "react";
import { connect } from "react-redux";
import { huyGheAction } from "../../redux/Action/BaiTapDatVeActions";

class ThongTinDatGhe extends Component {
  renderDatGhe = () => {
    let { datGhe } = this.props;
    return datGhe.map((ghe, index) => {
      return (
        <tr className="firstChar" style={{ fontSize: 25 }} key={index}>
          <td>{ghe.soGhe}</td>
          <td>{ghe.gia.toLocaleString()}</td>
          <td>
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                this.props.huyGhe(ghe);
              }}
            >
              x
            </span>
          </td>
        </tr>
      );
    });
  };

  tinhTongTien = () => {
    let { datGhe } = this.props;
    let tinhTien = datGhe.reduce((tongTien, ghe, index) => {
      return (tongTien += ghe.gia);
    }, 0);
    return tinhTien.toLocaleString();
  };

  tinhTongGhe = () => {
    let { datGhe } = this.props;
    return datGhe.reduce((tongGhe, ghe, index) => {
      return (tongGhe += 1);
    }, 0);
  };

  render() {
    // Mặc định của react là px trong thẻ style
    // Cách (1) fontSize:'30px'
    // Cách (2) fontSize: 30
    return (
      <div>
        <div className="mt-5">
          <button className="gheDaDat"></button>
          <span className="text-light ml-3" style={{ fontSize: "30px" }}>
            ghế đã đặt
          </span>
          <br />
          <button className="gheDangChon"></button>
          <span className="text-light ml-3" style={{ fontSize: "30px" }}>
            ghế đang chọn
          </span>
          <br />
          <button className="ghe ml-0"></button>
          <span className="text-light ml-3" style={{ fontSize: "30px" }}>
            ghế chưa chọn
          </span>
        </div>

        <div className="mt-5">
          <table className="table" border="2">
            <thead>
              <tr className="text-light" style={{ fontSize: 20 }}>
                <th>Số ghế</th>
                <th>Giá</th>
                <th>Hủy</th>
              </tr>
            </thead>
            <tbody>{this.renderDatGhe()}</tbody>
            <tfoot>
              <tr className="text-light" style={{ fontSize: 20 }}>
                <td>Tổng tiền</td>
                <td>{this.tinhTongTien()} VND</td>
                <td>
                  <span style={{ color: "yellow" }}>{this.tinhTongGhe()}</span>{" "}
                  <span className="ml-2">ghế</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    datGhe: rootReducer.BaiTapDatVeReducer.datGhe,
  };
};

const mapDispatchToProps = (dispatch) => ({
  huyGhe: (ghe) => {
    dispatch(huyGheAction(ghe));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinDatGhe);
