import { createStore, combineReducers } from "redux";
// import BaiTapOanTuXiReducer from "./BaiTapOanTuTiReducer";
// import BaiTapDatVeReducer from "./BaiTapDatVeReducer";
// import BaiTapBurgerReducer from "./BaiTapBurgerReducer";
// import BaiTapToDoListReducer from "./BaiTapToDoListReducer";
import BaiTapQuanLySinhVienReducer from "./BaiTapQuanLySinhVienReducer";

const rootReducer = combineReducers({
  // Tất cả reducer sẽ nằm ở đây
  // BaiTapOanTuXiReducer,
  // BaiTapDatVeReducer,
  // BaiTapBurgerReducer,
  // BaiTapToDoListReducer,
  BaiTapQuanLySinhVienReducer,
});

export const store = createStore(rootReducer);
