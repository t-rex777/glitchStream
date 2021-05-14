import React, { useState, useEffect } from "react";
import { InlineShareButtons } from "sharethis-reactjs";
import { RiShareForwardFill } from "react-icons/ri";

function ShareModal({ video, videoSrc }) {
  const [shareModal, setShareModal] = useState({ display: "none" });

  const openShareModal = (e) => {
    e.preventDefault();
    setShareModal({ display: "block" });
  };
  const cancelShareModal = (e) => {
    e.preventDefault();
    setShareModal({ display: "none" });
  };
  useEffect(() => {
    window.onclick = (e) => {
      if (e.target.className === "modal-active") {
        setShareModal({ display: "none" });
      }
    };
  }, []);
  return (
    <>
      <span className="interaction-item " onClick={openShareModal}>
        <RiShareForwardFill />
        <p>Share</p>
      </span>
      <div className="modal-active" style={shareModal}>
        <div className="modal-contents">
          <span className="modal-close" onClick={cancelShareModal}>
            &times;
          </span>
          <h1>Share video</h1>
          <InlineShareButtons
            config={{
              alignment: "center", // alignment of buttons (left, center, right)
              color: "social", // set the color of buttons (social, white)
              enabled: true, // show/hide buttons (true, false)
              font_size: 16, // font size for the buttons
              labels: "cta", // button labels (cta, counts, null)
              language: "en", // which language to use (see LANGUAGES)
              networks: [
                // which networks to include (see SHARING NETWORKS)
                "whatsapp",
                "linkedin",
                "messenger",
                "facebook",
                "twitter",
              ],
              padding: 12, // padding within buttons (INTEGER)
              radius: 4, // the corner radius on each button (INTEGER)
              show_total: true,
              size: 40, // the size of each button (INTEGER)

              // OPTIONAL PARAMETERS
              url: `${videoSrc}${video.videoId}`, // (defaults to current url)
              image: `${video.thumbnail}`, // (defaults to og:image or twitter:image)
              description: `${video.description}`, // (defaults to og:description or twitter:description)
              title: `${video.Name}`, // (defaults to og:title or twitter:title)
              message: "GlitchStream share", // (only for email sharing)
              subject: "GlitchStream share", // (only for email sharing)
              username: "GlitchStream share", // (only for twitter sharing)
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ShareModal;
