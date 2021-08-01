import React, { Component } from "react";
import { connect } from "react-redux";

class Player extends Component {
  renderOanTuXi = () => {
    let { mangDatCuoc } = this.props;
    return mangDatCuoc.map((item, index) => {
      let border = {};
      if (item.datCuoc) {
        border = { border: "5px solid orange" };
      }
      return (
        <div className="col-4" key={index}>
          <button style={border} className="btnItem">
            <img
              width={50}
              height={50}
              src={item.hinhAnh}
              alt={item.hinhAnh}
              onClick={() => {
                this.props.datCuocOanTuTi(item.ma);
              }}
            />
          </button>
        </div>
      );
    });
  };
  render() {
    let { mangDatCuoc } = this.props;
    return (
      <div className="playerGame">
        <div className="theThink">
          <img
            className="mt-3"
            style={{ transform: "rotate(-120deg)" }}
            width={100}
            height={100}
            // Tìm hinhAnh của item có datCuoc là true
            src={mangDatCuoc.find((item) => item.datCuoc).hinhAnh}
            alt={mangDatCuoc.find((item) => item.datCuoc).hinhAnh}
          />
        </div>
        <div className="speech-bubble"></div>
        <img
          style={{ width: 180, height: 140 }}
          src="./img/gameOanTuXi/player.png"
          alt="./img/gameOanTuXi/player.png"
        />
        <div className="row">{this.renderOanTuXi()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    datCuocOanTuTi: (maCuoc) => {
      const action = {
        type: "CHON_KEO_BUA_BAO",
        maCuoc,
      };
      return dispatch(action);
    },
  };
};

const mapStateToProps = (rootReducer) => {
  return {
    mangDatCuoc: rootReducer.BaiTapOanTuXiReducer.mangDatCuoc,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
