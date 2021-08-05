import { createStore, combineReducers } from "redux";
import BaiTapOanTuXiReducer from "./BaiTapOanTuTiReducer";
import BaiTapDatVeReducer from "./BaiTapDatVeReducer";

const rootReducer = combineReducers({
  // Tất cả reducer sẽ nằm ở đây
  BaiTapOanTuXiReducer,
  BaiTapDatVeReducer,
});

export const store = createStore(rootReducer);
