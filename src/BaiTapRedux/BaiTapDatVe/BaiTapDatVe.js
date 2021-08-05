import React, { Component } from "react";
import "./BaiTapDatVe.css";
import HangGhe from "./HangGhe";
import ThongTinDatGhe from "./ThongTinDatGhe";
import danhSachGheData from "../../data/danhSachGhe.json";

export default class BaiTapDatVe extends Component {
  renderHangGhe = () => {
    return danhSachGheData.map((hangGhe, index) => {
      return (
        <div key={index}>
          <HangGhe hGhe={hangGhe} />
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className="bookingMovie"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "url('./img/datVe/bgmovie.jpg')",
          backgroundSize: "100%",
        }}
      >
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-8 text-center">
                <div className="text-warning display-4">
                  ĐẶT VÉ XEM PHIM CYBERLEARN.VN
                </div>
                <div className="mt-3 text-light" style={{ fontSize: "25px" }}>
                  Màn hình
                </div>
                <div className="mt-2 d-flex flex-row justify-content-center">
                  <div className="screen"></div>
                </div>
                <div style={{marginLeft:'10%'}} className="mt-2 d-flex flex-column text-left">
                  {this.renderHangGhe()}
                </div>
              </div>
              <div className="col-4">
                <div
                  style={{ fontSize: "35px" }}
                  className="text-warning text-center mt-2"
                >
                  DANH SÁCH GHẾ BẠN CHỌN
                </div>
                <ThongTinDatGhe />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
