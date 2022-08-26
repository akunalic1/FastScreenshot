import React, { useState, useEffect, createRef } from "react";
import classnames from "classnames";
import { createStream, saveImage, saveVideo } from "../../utils";
import "../style/capture.css";

const CaptureOptions = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [startRecording, setStartRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [screenShot, setScreenShot] = useState("");

  const videoElement = createRef();

  const recordedChunks = [];

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    if (savedData) {
      videoElement.current.srcObject = null;
      videoElement.current.src = URL.createObjectURL(savedData);
    }
  }, [savedData]);

  window?.ELECTRON_API?.receiveScreenshot((event, image) => {
    setScreenShot(image);
  });

  function handleDataAvailable(e) {
    e.preventDefault();
    recordedChunks.push(e.data);
  }

  function handleStop(e) {
    e.preventDefault();
    const blob = new Blob([recordedChunks[recordedChunks.length - 1]], {
      type: "video/webm",
    });
    setSavedData(blob);
  }

  const setup = async () => {
    const mediaStream = await createStream();
    setStream(mediaStream);
    if (videoElement.current) {
      videoElement.current["srcObject"] = mediaStream;
      videoElement.current.play();
    }
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm",
    });
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
    setMediaRecorder(mediaRecorder);
  };

  const handleRecordScreen = (e) => {
    e.preventDefault();
    if (!videoElement.current.srcObject) {
      videoElement.current.currentTime = 0.0;
      videoElement.current.srcObject = stream;
    }
    videoElement.current.play();
    mediaRecorder.start();
    setScreenShot(null);
    setStartRecording(true);
  };

  const handleStopRecording = (e) => {
    e.preventDefault();
    mediaRecorder.stop();
    setStartRecording(false);
  };

  const handleCaptureEntireScreen = (e) => {
    e.preventDefault();
    window.ELECTRON_API.captureEntireScreen();
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    !!screenShot ? saveImage(screenShot) : saveVideo(savedData);
  };

  return (
    <div className="capture-content-options">
      <form>
        <input
          type={"image"}
          src={screenShot}
          name="image"
          className={!!screenShot ? "" : "hide"}
        ></input>
        <div
          className={classnames("recording", {
            hide: !!screenShot,
          })}
        >
          <video
            autoPlay={!startRecording && savedData != null}
            controls={!startRecording && savedData != null}
            ref={videoElement}
          ></video>
        </div>

        <div className="button-options">
          <button className="button" onClick={handleCaptureEntireScreen}>
            Capture Entire Screeen
          </button>
          <br />
          {!startRecording ? (
            <button className="button" onClick={handleRecordScreen}>
              Record Screeen
            </button>
          ) : (
            <button className="button" onClick={handleStopRecording}>
              Stop recording
            </button>
          )}
          <button className="button" type="submit" onClick={handleSaveData}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaptureOptions;
