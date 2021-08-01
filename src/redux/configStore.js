import { createStore, combineReducers } from "redux";
import BaiTapOanTuXiReducer from "./BaiTapOanTuTiReducer";

const rootReducer = combineReducers({
  // Tất cả reducer sẽ nằm ở đây
    BaiTapOanTuXiReducer,
});

export const store = createStore(rootReducer);
