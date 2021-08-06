import { createStore, combineReducers } from "redux";
import BaiTapOanTuXiReducer from "./BaiTapOanTuTiReducer";
import BaiTapDatVeReducer from "./BaiTapDatVeReducer";
import BaiTapBurgerReducer from "./BaiTapBurgerReducer";

const rootReducer = combineReducers({
  // Tất cả reducer sẽ nằm ở đây
  BaiTapOanTuXiReducer,
  BaiTapDatVeReducer,
  BaiTapBurgerReducer,
});

export const store = createStore(rootReducer);
