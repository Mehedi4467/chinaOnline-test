import React from 'react';
import ReactPlayer from 'react-player/youtube';
const Popup = ({ data, closeModal }) => {
  const { id, title, vid_src } = data;
  return (
    <>
      {vid_src && (
        <div className="popup" title={title} key={id} onClick={closeModal}>
          <div className="popup__wrapper">
            <div className="popup__container">
              <ReactPlayer
                controls={true}
                url={`https://www.youtube.com/watch?v=${vid_src}`}
                title="YouTube video player"
                className="popup__video"
                onEnded={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Popup;
