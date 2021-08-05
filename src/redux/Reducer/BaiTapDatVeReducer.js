import { CHON_GHE, HUY_GHE } from "../Type/BaiTapDatVeTypes";

const stateDefault = {
   datGhe: [
    // { soGhe: "A1", gia: 75000, daDat: false },
  ],
};

const BaiTapDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CHON_GHE: {
      let datGheUpdate = [...state.datGhe];
      let index = datGheUpdate.findIndex(ghe => ghe.soGhe === action.ghe.soGhe)
      if (index !== -1) {
        datGheUpdate.splice(index,1)
      } else {
        datGheUpdate.push(action.ghe);
      }
      state.datGhe = datGheUpdate;
      return { ...state };
    }
      
    case HUY_GHE: {
      let datGheUpdate = [...state.datGhe];
      datGheUpdate = datGheUpdate.filter(
        (ghe) => ghe.soGhe !== action.ghe.soGhe
      );
      state.datGhe = datGheUpdate;
      return {...state}
    }
    default:
      return { ...state };
  }
};

export default BaiTapDatVeReducer;
