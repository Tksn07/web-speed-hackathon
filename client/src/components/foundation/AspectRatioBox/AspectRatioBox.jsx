import React from 'react';

/**
 * @typedef {object} Props
 * @property {number} aspectHeight
 * @property {number} aspectWidth
 * @property {React.ReactNode} children
 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 * @type {React.VFC<Props>}
 */
const AspectRatioBox = ({ aspectHeight, aspectWidth, children }) => {
  /** @type {React.RefObject<HTMLDivElement>} */
  const ref = React.useRef(null);
  const [clientHeight, setClientHeight] = React.useState(0);

  React.useEffect(() => {
    console.log('😘😘😘');
    // clientWidth とアスペクト比から clientHeight を計算する
    function calcStyle() {
      const clientWidth = ref.current.clientWidth;
      setClientHeight((clientWidth / aspectWidth) * aspectHeight);
    }
    setTimeout(() => calcStyle(), 500);

    // ウィンドウサイズが変わるたびに計算する
    window.addEventListener('resize', calcStyle, { passive: true });
    return () => {
      window.removeEventListener('resize', calcStyle);
    };
  }, [aspectHeight, aspectWidth]);

  return (
    <div ref={ref} className="relative w-full h-1" style={{ height: clientHeight }}>
      {/* 高さが計算できるまで render しない */}
      {clientHeight !== 0 ? <div className="absolute inset-0">{children}</div> : null}
    </div>
  );
};

export { AspectRatioBox };
