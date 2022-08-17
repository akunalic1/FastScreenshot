import React from "react";

const CaptureOptions = () => {
  return (
    <div>
      <button onClick={(e) => window.ELECTRON_API.captureEntireScreen()}>
        Capture Entire Screeen
      </button>
      <br />
      <button onClick={(e) => window.ELECTRON_API.capturePartialScreen()}>
        Capture Partial Screeen
      </button>
      <br />
      <button onClick={(e) => window.ELECTRON_API.recordScreen()}>
        Record Screeen
      </button>
    </div>
  );
};

export default CaptureOptions;
