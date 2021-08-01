import React, { Component } from "react";
import { connect } from "react-redux";

class KetQuaOanTuTi extends Component {
  render() {
    return (
      <div>
        <div className="display-4 text-warning" style={{height:'135px'}}>{this.props.ketQua}</div>
        <div className="display-4 text-success mt-3">
          Số bàn thắng: 
          <span className="text-warning"> {this.props.soBanThang}</span>
        </div>
        <div className="display-4 text-success">
          Tổng bàn chơi: 
          <span className="text-warning"> {this.props.soBanChoi}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    ketQua: rootReducer.BaiTapOanTuXiReducer.ketQua,
    soBanThang: rootReducer.BaiTapOanTuXiReducer.soBanThang,
    soBanChoi: rootReducer.BaiTapOanTuXiReducer.soBanChoi,
  };
};

export default connect(mapStateToProps)(KetQuaOanTuTi);
