import React from "react";
import "./Pages.scss";
import Audit from "./Audit";
import Inscription from "./Inscription";

const Pages = () => {
  return (
    <React.Suspense>
      {/* <Audit /> */}
      <Inscription />
    </React.Suspense>
  );
};

export default Pages;
