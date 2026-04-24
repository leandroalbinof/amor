import React, { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_PAGES = 6;

const pages = [
  {
    title: 'Infância 👶',
    romantic: false,
    front: {
      photos: ['fotos/foto (1).jpg', 'fotos/foto (2).jpg'],
      message: 'Desde pequenininha, já era a pessoa mais especial desse mundo. Seus olhos brilhavam com a mesma luz que ilumina minha vida até hoje. 💛',
      num: 1,
    },
    back: {
      photos: ['fotos/foto (3).jpg', 'fotos/foto (4).jpg'],
      message: 'Cada sorriso seu de criança já prometia a mulher incrível que você se tornaria. ✨',
      num: 2,
    },
  },
  {
    title: 'Adolescência 🌸',
    romantic: false,
    front: {
      photos: ['fotos/foto (5).jpg', 'fotos/foto (6).jpg'],
      message: 'Crescendo, sonhando, se descobrindo... Cada fase sua foi linda de se ver. Você sempre foi cheia de luz e coragem. 🌟',
      num: 3,
    },
    back: {
      photos: ['fotos/foto (7).jpg', 'fotos/foto (8).jpg'],
      message: 'Seus sonhos de adolescente se transformaram em realidade. E eu tenho a sorte de fazer parte dessa história. 💫',
      num: 4,
    },
  },
  {
    title: 'Juventude 🌻',
    romantic: false,
    front: {
      photos: ['fotos/foto (9).jpg', 'fotos/foto (10).jpg'],
      message: 'Momentos que marcaram, conquistas que inspiraram. Você sempre foi forte, determinada e linda em tudo que faz. 🔥',
      num: 5,
    },
    back: {
      photos: ['fotos/foto (11).JPG', 'fotos/foto (12).jpg'],
      message: 'A vida te preparou para ser essa pessoa maravilhosa. E o melhor ainda estava por vir... 💕',
      num: 6,
    },
  },
  {
    title: 'Nosso Encontro 💘',
    romantic: true,
    front: {
      photos: ['fotos/foto (13).jpg', 'fotos/foto (14).jpg'],
      message: 'O dia em que nossos caminhos se cruzaram foi o dia mais especial da minha vida. Desde o primeiro olhar, eu soube que era você. 💗',
      num: 7,
    },
    back: {
      photos: ['fotos/foto (15).jpg', 'fotos/foto (16).jpg'],
      message: 'Você chegou e coloriu meu mundo inteiro. Obrigado por escolher caminhar ao meu lado. ❤️',
      num: 8,
    },
  },
  {
    title: 'Nossa História 📖',
    romantic: false,
    front: {
      photos: ['fotos/foto (17).jpg', 'fotos/foto (18).JPG'],
      message: 'Cada momento juntos é um tesouro. Risadas, abraços, viagens, e até as dificuldades nos fizeram mais fortes. 🌈',
      num: 9,
    },
    back: {
      photos: ['fotos/foto (19).jpg', 'fotos/foto (20).JPG', 'fotos/foto (21).jpg'],
      message: '8 anos de memórias que cabem no coração mas não cabem em palavras. Cada dia com você é uma nova aventura. 💞',
      num: 10,
    },
  },
  {
    title: 'Feliz Aniversário! 🎂',
    romantic: true,
    isFinal: true,
    front: {
      photos: ['fotos/foto (22).jpg', 'fotos/foto (23).jpg'],
      message: 'Meu amor, hoje é o seu dia e eu queria te dizer tudo que sinto. Nesses 8 anos juntos, você me ensinou o que é amar de verdade. Você é minha melhor amiga, minha companheira, minha paz. Cada dia ao seu lado é um presente. Obrigado por ser quem você é, por me fazer sorrir, por me fazer querer ser alguém melhor. Que esse novo ano da sua vida seja cheio de realizações, saúde e muito amor. Eu te amo mais do que palavras podem dizer. Feliz aniversário, meu amor! Pra sempre nós. ❤️🥂',
      num: 11,
    },
    back: {
      isEnd: true,
      num: 12,
    },
  },
];

// Typewriter component
function Typewriter({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, active]);

  if (!active && !done) return <span className="page-message">&nbsp;</span>;

  return (
    <p className="page-message">
      {displayed}
      {!done && <span className="cursor" />}
    </p>
  );
}

// Photo grid
function PhotoGrid({ photos }: { photos: string[] }) {
  const gridClass = photos.length === 3 ? 'grid-3' : 'grid-2';
  const tilts = ['tilted-left', 'tilted-right', 'straight', 'tilted-left'];
  return (
    <div className={`photo-grid ${gridClass}`}>
      {photos.map((src, i) => (
        <div key={i} className={`photo-frame ${tilts[i % tilts.length]}`}>
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

// Page side (front or back)
function PageSide({
  side,
  pageData,
  romantic,
  title,
  isFinal,
  activeTypewriter,
}: {
  side: 'front' | 'back';
  pageData: any;
  romantic: boolean;
  title?: string;
  isFinal?: boolean;
  activeTypewriter: boolean;
}) {
  if (pageData.isEnd) {
    return (
      <div className={`page-${side}`}>
        <div className="page-inner scrapbook end-page">
          <p className="end-text">Feito com todo amor do mundo 💕</p>
          <p className="end-emoji">🎂🥂💘</p>
        </div>
      </div>
    );
  }

  const innerClass = `page-inner scrapbook${romantic ? ' romantic' : ''}${isFinal && side === 'front' ? ' final-page' : ''}`;

  return (
    <div className={`page-${side}`}>
      <div className={innerClass}>
        <div className="tape tape-top-left" />
        {side === 'front' && <div className="tape tape-top-right" />}
        {side === 'front' && title && <h2 className="page-title">{title}</h2>}
        <PhotoGrid photos={pageData.photos} />
        {isFinal && side === 'front' ? (
          <div className="letter">
            <Typewriter text={pageData.message} active={activeTypewriter} />
          </div>
        ) : (
          <Typewriter text={pageData.message} active={activeTypewriter} />
        )}
        <div className="page-number">{pageData.num}</div>
      </div>
    </div>
  );
}

// Page flip sound
function usePageFlipSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  return useCallback(() => {
    try {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      const ctx = ctxRef.current;
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3) * 0.3;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      source.connect(filter).connect(ctx.destination);
      source.start();
    } catch {}
  }, []);
}

export default function App() {
  const [coverOpen, setCoverOpen] = useState(false);
  const [currentFlip, setCurrentFlip] = useState(0); // 0 = no page flipped, 1 = page 1 flipped, etc.
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [visibleSide, setVisibleSide] = useState<{ page: number; side: 'front' | 'back' }>({ page: 0, side: 'front' });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playFlipSound = usePageFlipSound();

  useEffect(() => {
    audioRef.current = document.getElementById('bg-music') as HTMLAudioElement;
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  const openAlbum = () => {
    setCoverOpen(true);
    // Auto-play music on open
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const restart = () => {
    setCurrentFlip(0);
    setVisibleSide({ page: 0, side: 'front' });
    setCoverOpen(false);
  };

  // Visible page numbers: when currentFlip = 0, we see page 0 front (pages 1-2)
  // when currentFlip = 1, page 0 is flipped, we see page 0 back then page 1 front
  // Actually: the visible spread is:
  //   Left side: page (currentFlip-1) back (if currentFlip > 0)
  //   Right side: page (currentFlip) front (if currentFlip < TOTAL_PAGES)

  const nextPage = () => {
    if (currentFlip >= TOTAL_PAGES) return;
    playFlipSound();
    setCurrentFlip(prev => prev + 1);
    // After flip, the visible content changes
    setTimeout(() => {
      setVisibleSide({
        page: currentFlip, // the page that just flipped
        side: 'back',
      });
    }, 500);
  };

  const prevPage = () => {
    if (currentFlip <= 0) return;
    playFlipSound();
    setCurrentFlip(prev => prev - 1);
    setTimeout(() => {
      setVisibleSide({
        page: currentFlip - 1,
        side: 'front',
      });
    }, 500);
  };

  // Determine which page/side is currently "active" for typewriter
  // Right side visible: page[currentFlip].front (if not all flipped)
  // Left side visible: page[currentFlip-1].back (if any flipped)
  // We trigger typewriter for the most recently revealed side
  const getActiveTypewriter = (pageIndex: number, side: 'front' | 'back') => {
    return visibleSide.page === pageIndex && visibleSide.side === side;
  };

  // Page indicator
  const leftNum = currentFlip > 0 ? pages[currentFlip - 1].back?.num : null;
  const rightNum = currentFlip < TOTAL_PAGES ? pages[currentFlip].front.num : null;
  let indicatorText = '';
  if (leftNum && rightNum) indicatorText = `Página ${leftNum}-${rightNum} de ${TOTAL_PAGES * 2}`;
  else if (rightNum) indicatorText = `Página ${rightNum} de ${TOTAL_PAGES * 2}`;
  else if (leftNum) indicatorText = `Página ${leftNum} de ${TOTAL_PAGES * 2}`;

  return (
    <>
      {/* CAPA */}
      <div className={`cover${coverOpen ? ' hide' : ''}`}>
        <div className="cover-texture" />
        <div className="cover-content">
          <div className="cover-ornament">✦</div>
          <h1 className="cover-name">Meu Amor</h1>
          <div className="cover-divider" />
          <h2 className="cover-title">Nossa História</h2>
          <p className="cover-subtitle">8 anos de amor</p>
          <button className="btn-open" onClick={openAlbum}>
            <span>Abrir Álbum</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <div className="cover-ornament bottom">✦</div>
        </div>
      </div>

      {/* ÁLBUM */}
      <div className={`album-wrapper${coverOpen ? ' show' : ' hidden'}`}>
        <div className="album-controls">
          <button className={`ctrl-btn${musicPlaying ? ' playing' : ''}`} onClick={toggleMusic} title="Tocar/Pausar música">
            {musicPlaying ? '🔊' : '🎵'}
          </button>
          <button className="ctrl-btn" onClick={restart} title="Voltar à capa">🔄</button>
        </div>

        <div className="album-container">
          <div className="album">
            {pages.map((page, i) => (
              <div
                key={i}
                id={`page-${i + 1}`}
                className={`page${i < currentFlip ? ' flipped' : ''}`}
                style={{ zIndex: TOTAL_PAGES - i }}
              >
                <PageSide
                  side="front"
                  pageData={page.front}
                  romantic={!!page.romantic}
                  title={page.title}
                  isFinal={!!page.isFinal}
                  activeTypewriter={getActiveTypewriter(i, 'front')}
                />
                <PageSide
                  side="back"
                  pageData={page.back}
                  romantic={!!page.romantic}
                  isFinal={false}
                  activeTypewriter={getActiveTypewriter(i, 'back')}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="album-nav">
          <button className="nav-btn" onClick={prevPage} disabled={currentFlip <= 0}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="page-indicator">{indicatorText}</span>
          <button className="nav-btn" onClick={nextPage} disabled={currentFlip >= TOTAL_PAGES}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
