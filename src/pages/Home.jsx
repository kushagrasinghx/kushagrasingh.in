import { useEffect, useRef, useState } from 'react'
import squarePfp from '../assets/square-pfp.png'

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const cards = [
    { image: '/someone.png', href: 'https://www.someone.co.in/' },
    { image: '/socialsense.png', href: 'https://www.socialsense.ai/' },
    { image: '/suite.png', href: '' },
    { image: '/figma.png', href: '' },
    { image: '/framer.png', href: '' },
    { image: '/github.png', href: 'https://github.com/kushagrasinghx/' },
    { image: '/linkedin.png', href: 'https://linkedin.com/in/kushagra-singh-varanasi' },
    { image: '/contact.png', href: '/contact' },
    { image: '/resume.png', href: '/resume' },
  ]

  const randomRotations = cards.map(() => (Math.random() - 0.5) * 8 - 2)

  return (
  <main className={`w-full min-h-[calc(100vh-100px)] flex flex-col box-border px-4 sm:px-6 md:px-[100px] py-[24px] md:py-[40px] overflow-x-hidden items-center text-white`}> 
      <div className='w-full max-w-[1500px]'>
        <div className='w-full flex mb-5'>
          <img src={squarePfp} alt='Profile' className='w-[70px] h-[70px] md:w-[90px] md:h-[90px] object-cover rounded-full' />
        </div>

        <div className='w-full font-ptserif text-[32px] leading-tight sm:text-[40px] md:text-7xl'>
          hey there! I'm Kushagra, a product designer that codes
          <span className='inline-block align-middle ml-2 md:ml-3'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-[1em] h-[1em]' aria-hidden='true'>
              <path fill='currentColor' d='M12 2 L15.535 8.465 L22 12 L15.535 15.535 L12 22 L8.465 15.535 L2 12 L8.465 8.465 Z' />
            </svg>
          </span>
        </div>

        <div className='w-full flex flex-col gap-4 md:gap-6'>
          <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-10'>
            <div className='font-ptserif text-2xl sm:text-3xl md:text-5xl mt-6 md:mt-10 text-white/50 dark:text-white/50'>
              <a href='mailto:contact@kushagrasingh.in' className='hover:text-white dark:hover:text-white transition-colors'>hello@kushagrasingh.in</a>
            </div>
      <div className='font-ptserif text-2xl sm:text-3xl md:text-5xl mt-0 md:mt-10 text-white/50 dark:text-white/50'>
              <a
                href='https://linkedin.com/in/kushagra-singh-varanasi'
                target='_blank'
                rel='noopener noreferrer'
        className='hover:text-white dark:hover:text-white transition-colors'
              >
                connect on linkedin
              </a>
            </div>
          </div>

          <div className='flex items-center text-base sm:text-lg text-white/50 dark:text-white/50 mt-2'>
            <span className='inline-block w-3 h-3 rounded-full bg-green-400 mr-3'></span>
            <span className='font-medium'>working at</span>
            <span className='font-medium text-green-400 ml-2'>NextFront Technologies</span>
          </div>
        </div>
      </div>

      {/* Cards: Desktop/original layout (md and up) */}
  <div className='relative mt-10 md:mt-20 md:px-[60px] overflow-visible justify-center hidden md:flex'>
        <div className='flex items-end'>
          {cards.map((card, i) => (
            <div
              key={card.image + i}
              className={`group relative h-[360px] w-[240px] rounded-2xl border-2 border-white/20 dark:border-white/20 overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${i !== 0 ? '-ml-24' : ''} hover:z-50 ${hoveredIndex !== null && hoveredIndex !== i ? 'blur-sm opacity-60' : ''}`}
              style={{ '--hover-rotate': `${randomRotations[i]}deg` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={card.href}
                target={card.href?.startsWith('http') ? '_blank' : undefined}
                rel={card.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className='absolute inset-0 block'
              >
                <img src={card.image} alt='' className={`h-full w-full object-cover transition duration-300 ${hoveredIndex !== null && hoveredIndex !== i ? 'blur-sm opacity-60' : ''}`} />
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 dark:ring-white/10' />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Cards: Mobile stacked, draggable deck (hidden on md+) */}
      <div className='w-full mt-8 sm:mt-10 md:hidden'>
        <MobileCardDeck cards={cards} />
      </div>

      {/* Footer */}
  <div className='mt-5 mb-10 md:mt-10 w-full flex justify-center text-white/70 dark:text-white/70 md:text-white dark:md:text-white'>
        ©2025 Kushagra Singh
      </div>

    </main>
  )
}

/**
 * Mobile-only stacked draggable deck
 * Drag the top card in any direction -> it animates out and is moved to the bottom.
 */
function MobileCardDeck({ cards }) {
  const [deck, setDeck] = useState(cards);
  const [drag, setDrag] = useState({ dx: 0, dy: 0, dragging: false });
  const startRef = useRef({ x: 0, y: 0 });
  const topCardRef = useRef(null);
  const animatingRef = useRef(false);

  // Stable per-card base rotations so the stack looks organic
  const rotationMapRef = useRef(
    new Map(cards.map(c => [c.image, (Math.random() - 0.5) * 8])) // ~ -4° to +4°
  );

  const THRESHOLD = 80;

  const onPointerDown = (e) => {
    if (animatingRef.current) return;
    const point = getPoint(e);
    startRef.current = point;
    setDrag({ dx: 0, dy: 0, dragging: true });
    topCardRef.current?.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.dragging || animatingRef.current) return;
    const { x, y } = getPoint(e);
    const dx = x - startRef.current.x;
    const dy = y - startRef.current.y;
    setDrag((d) => ({ ...d, dx, dy }));
  };

  const onPointerUp = () => {
    if (animatingRef.current) return;
    const dist = Math.hypot(drag.dx, drag.dy);

    if (dist > THRESHOLD) {
      animatingRef.current = true;
      const angle = Math.atan2(drag.dy, drag.dx);
      const outX = Math.cos(angle) * 500;
      const outY = Math.sin(angle) * 500;

      const el = topCardRef.current;
      if (el) {
        el.style.transition = 'transform 260ms ease-out, opacity 260ms ease-out';
        el.style.transform = `translate(${outX}px, ${outY}px) rotate(${drag.dx * 0.05}deg)`;
        el.style.opacity = '0';
      }

      setTimeout(() => {
        // Move the LAST card to the FRONT so the new top becomes previous second-last
        setDeck((prev) => {
          const last = prev[prev.length - 1];
          const rest = prev.slice(0, -1);
          return [last, ...rest];
        });

        if (el) {
          el.style.transition = 'none';
          el.style.transform = 'translate(0px, 0px) rotate(0deg)';
          el.style.opacity = '1';
          // force reflow
          // eslint-disable-next-line no-unused-expressions
          el.offsetHeight;
        }
        animatingRef.current = false;
        setDrag({ dx: 0, dy: 0, dragging: false });
      }, 270);
    } else {
      const el = topCardRef.current;
      if (el) {
        el.style.transition = 'transform 180ms ease-out';
        el.style.transform = 'translate(0px, 0px) rotate(0deg)';
      }
      setTimeout(() => {
        if (el) el.style.transition = 'none';
        setDrag({ dx: 0, dy: 0, dragging: false });
      }, 190);
    }
  };

  return (
    <div className='relative h-[420px] w-full'>
      {deck.map((_, i) => {
        // Render VISUAL order from last -> first (last is TOP)
        const idx = deck.length - 1 - i;
        const card = deck[idx];

        const isTop = idx === deck.length - 1; // last item is visually on top
        const depth = deck.length - 1 - idx;   // top = 0, bottom increases
        const scale = 1 - Math.min(depth, 4) * 0.04;
        const translateY = Math.min(depth, 4) * 10;

        const baseRotation = rotationMapRef.current.get(card.image) ?? 0;

        // Live transform for the top card while dragging
        let transform = `translate(0px, ${translateY}px) rotate(${baseRotation}deg) scale(${scale})`;
        let opacity = 1;

        if (isTop && (drag.dragging || drag.dx !== 0 || drag.dy !== 0)) {
          const rotate = drag.dx * 0.04 + baseRotation;
          transform = `translate(${drag.dx}px, ${drag.dy + translateY}px) rotate(${rotate}deg) scale(${scale})`;
          opacity = Math.max(0.5, 1 - Math.abs(drag.dx) / 400);
        }

        // Higher zIndex for items closer to top
        const z = deck.length - depth;

        return (
          <a
            key={card.image + idx}
            href={card.href || '#'}
            target={card.href?.startsWith('http') ? '_blank' : undefined}
            rel={card.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[360px] w-[240px] rounded-2xl overflow-hidden border-2 border-white/20 dark:border-white/20 md:shadow-[0_30px_80px_rgba(0,0,0,0.45)] dark:md:shadow-[0_30px_80px_rgba(0,0,0,0.45)]'
            style={{
              transform,
              zIndex: z,
              opacity,
              willChange: 'transform, opacity'
            }}
            onPointerDown={isTop ? onPointerDown : undefined}
            onPointerMove={isTop ? onPointerMove : undefined}
            onPointerUp={isTop ? onPointerUp : undefined}
            onPointerCancel={isTop ? onPointerUp : undefined}
            ref={isTop ? topCardRef : undefined}
          >

            <img
              src={card.image}
              alt=''
              className='h-full w-full object-cover select-none touch-none'
              draggable={false}
            />
            <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 dark:ring-white/10 pointer-events-none' />
          </a>
        );
      })}
    </div>


  );
}

function getPoint(e) {
  if (e.touches && e.touches[0]) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  return { x: e.clientX, y: e.clientY }
}
