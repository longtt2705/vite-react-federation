import { FunctionComponent } from 'react';

interface VideoBackgroundProps {
  name: string;
}

const VideoBackground: FunctionComponent<VideoBackgroundProps> = ({ name }) => {
  return (
    <video
      src={`/static/videos/${name}.mp4`}
      style={{
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        position: 'fixed',
        top: 0,
        left: 0
      }}
      autoPlay
      muted
      loop
    />
  );
};

export default VideoBackground;
