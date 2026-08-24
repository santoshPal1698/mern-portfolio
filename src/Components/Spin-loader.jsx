import React from "react";
import { Vortex } from "react-loader-spinner";
import { Hourglass } from "react-loader-spinner";

const Spin_loader = ({ visible = true, fullScreen = true }) => {
  return (
    <div
      className="d-flex justify-content-center py-5"
      style={{
        position: fullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: fullScreen ? "100vh" : "auto",
        display: visible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: fullScreen ? "rgba(0,0,0,0.3)" : "transparent",
        zIndex: 9999,
      }}
    >
      <Hourglass
        visible={visible}
        height="50%"
        width="50%"
        ariaLabel="hourglass-loading"
        wrapperClass="vortex-wrapper"
        colors={['#111111', '#FFFF', '#333333', '#FFFFFF', '#111111']}
      />
    </div>
  );
};

export default Spin_loader;
