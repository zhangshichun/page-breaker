import { ReactComponent as Firecracker } from './firecracker.svg'
import anime from 'animejs'
import { useState } from 'react';
import React from 'react';
import './style.less'
export default function firecrackers ({ className, onBoom }: { className: string, onBoom: Function }) {
  const [showBoom, setShowBoom ] = useState(true)
  const [displaying, setDisplaying] = useState(false)

  const onClick = async () => {
    if (displaying) {
      return
    }
    setDisplaying(true)
    const body = window.document.querySelector('body') as HTMLBodyElement
    const { clientHeight: bodyClientHeight, clientWidth: bodyClientWidth } = body
    const timeline :anime.AnimeTimelineInstance = anime.timeline();
    timeline.add({
      targets: '#fuse',
      strokeDashoffset: (target:any) => -target.getTotalLength(),
      duration: 2000,
      begin: (animation) => {
        const target = animation.animatables[0].target;
        const length = (target as any).getTotalLength();
        target.setAttribute('stroke-dasharray', length);
      },
      easing: 'linear',
    });
    const motionPath: SVGElement = document.querySelector('#fuse') as SVGElement;
    const path = anime.path(motionPath);
    timeline.add({
        targets: '#spark',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        duration: 2000,
        easing: 'linear',
    }, '-=2000');

    timeline.add({
        targets: '#ember',
        transform: Array(21).fill('scale(2.5)').map((scale, index) => index % 2 === 0 ? 'scale(1.4)' : scale),
        duration: 2000,
        easing: 'easeInOutSine',
        direction: 'alternate',
    }, '-=2000');

    timeline.add({
        targets: '#sparkles',
        transform: Array(21).fill('scale(1.5)').map((scale, index) => index % 2 === 0 ? 'scale(0)' : scale),
        duration: 2000,
        easing: 'easeInOutSine',
        direction: 'alternate',
    }, '-=2000');

    timeline.add({
        targets: '#spark',
        scale: 4.5,
        opacity: 0,
        duration: 250,
        easing: 'easeInOutSine',
    });
    timeline.add({
      targets: '#bomb',
      opacity: 0,
      duration: 250,
      easing: 'easeInOutSine',
    });
    timeline.add({
      targets: sparkRef.current,
      backgroundColor: {
        value: '#fff',
        duration: 300
      },
      width: 1 * Math.max(bodyClientHeight, bodyClientWidth),
      height: 1 * Math.max(bodyClientHeight, bodyClientWidth),
      duration: 1000,
      complete: () => {
        onBoom && onBoom()
      }
    }, '+=10')
    timeline.add({
      targets: maskRef.current,
      backgroundColor: `rgba(0,0,0,0.8)`,
      duration: 800,
      easing: 'easeInOutCirc',
    }, '-=1000')
    timeline.add({
      targets: sparkRef.current,
      width: 0,
      height: 0,
      opacity: 0,
      duration: 3000,
      easing: 'easeInOutCirc',
    })
    timeline.add({
      targets: maskRef.current,
      backgroundColor: `rgba(0,0,0,0)`,
      duration: 3000,
      opacity: 0,
      easing: 'easeInOutCirc',
    }, '-=3000')

    await timeline.finished
    setShowBoom(false)
  }

  const sparkRef = React.createRef<HTMLDivElement>()
  const maskRef = React.createRef<HTMLDivElement>()

  return ( showBoom ?
    <div ref={ maskRef } className={ `${className} mask` } onClick={ onClick }>
      <div ref={sparkRef} className='spark'>
      <Firecracker/>
      </div>
    </div> : null
  )
}
