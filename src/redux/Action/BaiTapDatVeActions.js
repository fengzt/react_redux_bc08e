import { CHON_GHE, HUY_GHE } from "../Type/BaiTapDatVeTypes";

export const chonGheAction = (ghe) => {
  return {
    type: CHON_GHE,
    ghe,
  };
};

export const huyGheAction = (ghe) => ({
  type: HUY_GHE,
  ghe,
});
