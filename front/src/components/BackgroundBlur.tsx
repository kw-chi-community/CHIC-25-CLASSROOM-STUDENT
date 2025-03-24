const BackgroundBlur = () => {
  return (
    <>
      {/* Blur 효과 원 (Ellipse 1 - 노란색) */}
      <div className="absolute w-52 h-52 bg-yellow opacity-45 blur-[120px] left-[10%] top-[5%] pointer-events-none z-0" />

      {/* Blur 효과 원 (Ellipse 2 - 보라색) */}
      <div className="absolute w-52 h-52 bg-purple opacity-50 blur-[120px] right-[10%] top-[15%] pointer-events-none z-0" />
    </>
  );
};

export default BackgroundBlur;
