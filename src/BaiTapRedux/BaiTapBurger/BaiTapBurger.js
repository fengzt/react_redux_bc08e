import React, { Component } from "react";
import { connect } from "react-redux";
import "./BaiTapBurger.css";

class BaiTapBurger extends Component {
  renderBreadMix = () => {
    // Kết quả trả về sẽ là MẢNG JSX của từng thuộc tính (salad, cheese, beef) ứng với value tương ứng

    let { burger } = this.props;
    // console.log(burger) {salad: 1, cheese: 1, beef: 1}
    // Để bóc tách value của key, có 2 cách

    //-----------------------------------------------------------
    // Cách 1: for in => chạy 2 vòng lặp: 'for' trong 'for in'
    let content = []; // mảng chứa giá trị cần tạo ra
    for (let propsBurger in burger) {
      //   console.log(propsBurger, burger[propsBurger]);
      //   // salad: 1
      //   // cheese: 1
      //   // beef: 1

      // Kết hợp thêm hàm for để lặp các thuộc tính ứng với số lần là value
      let breadMix = [];
      for (let i = 0; i < burger[propsBurger]; i++) {
        breadMix.push(<div key={i} className={propsBurger}></div>);
      }
      content.push(breadMix);
    }
    return content;

    //-----------------------------------------------------------
    // Cách 2: dùng Object.entries => turble: đối tượng được thể hiện dưới dạng mảng
    // // console.log(Object.entries(burger));
    // // 0: (2) ["salad", 1] -> turble 1
    // // 1: (2) ["cheese", 1] -> turble 2
    // // 2: (2) ["beef", 1] -> turble 3

    // Kết hợp thêm hàm map để bóc tách phần tử, dùng destructer của es6
    // các item trong burger đang là mảng []
    // return Object.entries(burger).map(([propsBurger, value], index) => {
    //   console.log(propsBurger, value);
    //   // salad: 1
    //   // cheese: 1
    //   // beef: 1

    // Kết hợp thêm hàm for để lặp các thuộc tính ứng với số lần là value
    //   let content = [];
    //   for (let i = 0; i < value; i++) {
    //     content.push(<div key={i} className={propsBurger}></div>);
    //   }
    //   return content;
    // });

    // Cách 2 này là chạy 2 vòng lặp: 'for' trong 'map' ===> content trả về là duyệt đủ thuộc tính trong burger
    // => for sẽ tạo ra số value thuộc tính (lần 1: số miếng salad) và push vào mảng content
    // map sẽ duyệt object sang thuộc tính tiếp theo (cheese) và tiếp tục lặp for (lần 2: số miếng cheese) -> push vào mảng content
    // Tương tự sẽ có lần 3: số miếng beef và được push vào mảng content.
  };

  renderMenu = () => {
    let { burger, menu } = this.props;
    // console.log(menu);
    return Object.entries(menu).map(([propsMenu, price], index) => {
      //   console.log(propsMenu, price);

      // {burger[propsMenu]} gọi được ra số lượng, vì thuộc tính burger và menu đồng nhất
      // burger[salad] // burger[cheese] // burger[beef]
      return (
        <tr key={index}>
          <td>{propsMenu}</td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => this.props.thayDoiMon(propsMenu, 1)}
            >
              +
            </button>
            <span className="ml-2 mr-2">{burger[propsMenu]}</span>
            <button
              className="btn btn-primary"
              onClick={() => this.props.thayDoiMon(propsMenu, -1)}
            >
              -
            </button>
          </td>
          <td>{price}</td>
          <td>{price * burger[propsMenu]}</td>
        </tr>
      );
    });
  };

  tinhTongTien = () => {};

  render() {
    return (
      <div className="container">
        <h3 className="display-4 text-success">Bài tập Burger Cybersoft</h3>
        <div className="row">
          <div className="col-7">
            <h4 className="text-center text-danger">Bánh Burger của bạn</h4>
            <div className="breadTop"></div>
            {this.renderBreadMix()}
            <div className="breadBottom"></div>
          </div>
          <div className="col-5">
            <h4 className="text-center text-danger">Chọn thức ăn</h4>
            <table className="table">
              <thead>
                <tr className="font-weight-bold">
                  <td>Thức ăn</td>
                  <td className="pl-4">Số lượng</td>
                  <td>Đơn giá</td>
                  <td>Thành tiền</td>
                </tr>
              </thead>
              <tbody>{this.renderMenu()}</tbody>
              <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td>Tổng tiền</td>
                  <td>{this.props.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  burger: state.BaiTapBurgerReducer.burger,
  menu: state.BaiTapBurgerReducer.menu,
  total: state.BaiTapBurgerReducer.total,
});

const mapDispatchToProps = (dispatch) => ({
  thayDoiMon: (propsMenu, heSo) => {
    const action = {
      type: "THAY_DOI_MON",
      propsMenu,
      heSo,
    };
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BaiTapBurger);
