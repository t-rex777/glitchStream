import React, { useEffect } from "react";
import { useVideo } from "../../video-context/VideoContext";
import "./toast.css";
function Toast() {
  const { state, dispatch } = useVideo();
  useEffect(() => {
    if (state.toast) {
      setTimeout(() => {
        dispatch({ type: "TOAST_STYLE", payload: { display: "none" } });
      }, 3000);
    }
  }, [state.toast]);
  return (
    <div className="toast success" style={state.toastStyle}>
      <p className="toast-message ">{state.toast}</p>
    </div>
  );
}

export default Toast;
