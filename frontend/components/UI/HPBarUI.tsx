import { useState } from "react";
import HPBar from "./HPBar";

const HPBarUI = ({ hp }: any) => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      <HPBar hp={hp} maxHp={100} />
    </div>
  );
};

export default HPBarUI;
