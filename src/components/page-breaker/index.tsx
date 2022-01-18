import './index.less';
import ImageBreak from '@/components/image-break/index';
import Firecrackers from '@/components/firecrackers';
import React, { useEffect, useState } from 'react';

export default function PageBreaker({ imgUrl }: { imgUrl: string }) {

  const containerRef = React.createRef<HTMLDivElement>()
  const [width, setWidth ] = useState<number>(0)
  const [height, setHeight]= useState<number>(0)
  useEffect(() => {
    if (containerRef.current?.clientWidth && containerRef.current?.clientHeight) {
      setWidth(containerRef.current?.clientWidth)
      setHeight(containerRef.current?.clientHeight)
    }
  }, [containerRef])

  const breaker = React.createRef()

  const onBoom = () => {
    (breaker.current as any).breakPage()
  }

  return (
    <div className='container' ref={containerRef}>
      <Firecrackers className="center" onBoom={onBoom}></Firecrackers>
      {width && height && <ImageBreak ref={breaker} canvasWidth={width} canvasHeight={height} imgUrl={imgUrl}/>}
    </div>
  );
}
