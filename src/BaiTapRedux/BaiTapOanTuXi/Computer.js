import React, { Component } from "react";
import { connect } from "react-redux";

class Computer extends Component {
  render() {
    // keyframe css
    let keyframe = `@keyframes randomItem${Date.now()} {
      0% {top: -50px;}
      25% {top: 100px;}
      50% {top: -50px;}
      75% {top: 50px;}
      100% {top: 0px;}
    }`;
    let { computer } = this.props;
    return (
      <div className="playerGame">
        <style>{keyframe}</style>
        <div className="theThink" style={{ position: "relative", overflow:"hidden" }}>
          <img
            className="mt-3"
            style={{
              animation: `randomItem${Date.now()} 0.4s`,
              transform: "rotate(-120deg)",
              position: "absolute",
              left: "20%",
            }}
            width={100}
            height={100}
            src={computer.hinhAnh}
            alt={computer.hinhAnh}
          />
        </div>
        <div className="speech-bubble"></div>
        <img
          style={{ width: 180, height: 140 }}
          src="./img/gameOanTuXi/playerComputer.png"
          alt="./img/gameOanTuXi/playerComputer.png"
        />
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    computer: rootReducer.BaiTapOanTuXiReducer.computer,
  };
};

export default connect(mapStateToProps, null)(Computer);
