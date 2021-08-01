import React, { Component } from "react";
import "./BaiTapOanTuXi.css";
import Computer from "./Computer";
import KetQuaOanTuTi from "./KetQuaOanTuTi";
import Player from "./Player";
import { connect } from "react-redux";

class BaiTapOanTuXi extends Component {
  render() {
    return (
      <div className="gameOanTuXi">
        <div className="row text-center mt-5">
          <div className="col-4 mt-2">
            <Player />
          </div>
          <div className="col-4 mt-2">
            <KetQuaOanTuTi />
            <button
              onClick={() => {
                this.props.playGame();
              }}
              className="btn btn-success p-2 display-4 mt-3"
            >
              Play game
            </button>
            <button
              onClick={() => {
                this.props.resetGame();
              }}
              className="btn btn-primary p-2 display-4 mt-3 ml-5"
            >
              Reset game
            </button>
          </div>
          <div className="col-4 mt-2">
            <Computer />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playGame: () => {
      // Thực hiện cho hình lặp nhiều lần
      // setInterval có 2 tham số (1) hàm lặp (2) thời gian giữa các lần lăp - mili giây
      let count = 1;
      let randomComputerTimes = setInterval(() => {
        const action = {
          type: "RAN_DOM",
        };
        count++;
        // console.log(count)
        if (count > 10) {
          clearInterval(randomComputerTimes);
          const action = {
            type: "END_GAME",
          }
          return dispatch(action);
        }
        return dispatch(action);
      }, 100);
    },
    resetGame: () => {
      const action = {
        type: "RESET",
      }
      dispatch(action);
    }
  };
};

export default connect(null, mapDispatchToProps)(BaiTapOanTuXi);
