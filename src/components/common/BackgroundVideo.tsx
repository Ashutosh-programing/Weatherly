const BackgroundVideo = ({ src }: { src: string }) => (
  <div className="absolute inset-0 -z-10 overflow-hidden w-full h-full">
    <video
      src={src}
      className="w-full h-full object-cover"
      muted
      loop
      autoPlay
      playsInline
    />
  </div>
);

export default BackgroundVideo;