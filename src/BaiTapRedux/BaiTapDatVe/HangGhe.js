import React, { Component } from "react";
import { connect } from "react-redux";
import { chonGheAction } from "../../redux/Action/BaiTapDatVeActions";

class HangGhe extends Component {
  renderGhe = () => {
    let { hGhe, datGhe } = this.props;
    if (hGhe.hang === '') {
      return hGhe.danhSachGhe.map((ghe, index) => {
        return <span className="rowNumber" key={index}>{ghe.soGhe}</span>;
      })
    }
    return hGhe.danhSachGhe.map((ghe, index) => {
      let cssGheDaChon = "";
      let disabled = false;
      let cssGheDuocChon = "";
      if (ghe.daDat) {
        cssGheDaChon = "gheDaDat";
        disabled = true;
      }
      let gheDangChon = datGhe.find(gheChon => gheChon.soGhe === ghe.soGhe)
      if (gheDangChon) {
        cssGheDuocChon = "gheDangChon";
      }
      return (
        <button
          disabled={disabled}
          onClick={() => {
            this.props.gheDuocChon(ghe);
          }}
          className={`${cssGheDaChon} ${cssGheDuocChon} ghe`}
          key={index}
        >
          {ghe.soGhe}
        </button>
      );
    });
  };
  render() {
    let { hGhe } = this.props;
    return (
      <div style={{ fontSize: 28 }} className="text-light d-flex">
        <div className="firstChar">{hGhe.hang}</div>
        {this.renderGhe()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    datGhe: state.BaiTapDatVeReducer.datGhe,
  }
};


const mapDispatchToProps = (dispatch) => ({
  gheDuocChon: (ghe) => {
    dispatch(chonGheAction(ghe));
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(HangGhe)
