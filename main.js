// Letras con sincronización exacta milisegundo a milisegundo (LRCLib / Apple Music)
// "Patadas de Ahogado" - LATIN MAFIA, Humbe
const lyricsData = [
  { time: 0.0, text: "Tú hueles a vainilla, te quiero" },
  { time: 9.19, text: "Dale, abrázame otro rato" },
  { time: 14.25, text: "Déjame, te soy sincero" },
  { time: 19.78, text: "Tiene tiempo que yo trato" },
  { time: 25.39, text: "Llevaba tiempo buscando a quién cantarle" },
  { time: 30.85, text: "Sobre cuando me siento vulnerable" },
  { time: 35.54, text: "Dale, abrázame otro rato" },
  { time: 40.54, text: "Apapáchame la vida entera" },
  { time: 42.24, text: "Quiero saberte a lo que quieres" },
  { time: 44.94, text: "Llorar por lo que te hace llorar" },
  { time: 47.38, text: "Ser música de la que prefieres" },
  { time: 50.24, text: "Y que nunca me quieras pausar" },
  { time: 52.91, text: "Quiero saberte a lo que quieres" },
  { time: 55.57, text: "Llorar por lo que te hace llorar" },
  { time: 57.82, text: "Ser música de la que prefieres" },
  { time: 60.82, text: "Y que nunca me quieras pausar" },
  { time: 63.44, text: "Aventando patadas de ahogado (de ahogado)" },
  { time: 68.76, text: "Sin saber si la armamos, seguimos nadando (nadando)" },
  { time: 74.07, text: "Por ti sigo tratando, cavando" },
  { time: 79.00, text: "Regando las flores que de viejos nos veo fumando" },
  { time: 85.38, text: "(Fumando, ah-ah-ah-ah-ah, fumando)" },
  { time: 96.22, text: "No me da miedo admitir que" },
  { time: 98.62, text: "Desde la primera vez que te vi" },
  { time: 101.38, text: "Yo ya me lo veía venir: estar all in por ti" },
  { time: 106.38, text: "Porque yo ya sabía a lo que iba" },
  { time: 109.00, text: "Querer comprarnos un terreno y construirnos la vida" },
  { time: 114.40, text: "Porque contigo lo sabía" },
  { time: 116.26, text: "Que tú y yo vamos por la milla (hey)" },
  { time: 118.53, text: "Y que siempre voy a querer saber si va bien todo en tu día" },
  { time: 124.36, text: "¿Qué tal va tu día? (¿qué tal va tu día?)" },
  { time: 126.92, text: "Es lo que me importa, mi vida" },
  { time: 129.35, text: "Si vamos tarde por tu culpa decir que es la mía" },
  { time: 134.45, text: "(Que fue culpa mía)" },
  { time: 137.38, text: "Aventando patadas de ahogado (de ahogado)" },
  { time: 142.67, text: "Sin saber si la armamos, seguimos nadando (nadando)" },
  { time: 147.86, text: "Por ti sigo tratando, cavando" },
  { time: 152.78, text: "Regando las flores que de viejos nos veo fumando" },
  { time: 158.26, text: "Aventando patadas de ahogado" },
  { time: 163.42, text: "Sin saber si la armamos, seguimos nadando" },
  { time: 169.01, text: "Por ti sigo tratando, cavando" },
  { time: 173.95, text: "Regando las flores que de viejos nos veo fumando" },
  { time: 177.64, text: "(Nos veo fumando)" },
  { time: 179.58, text: "Llevaba tiempo buscando a quién cantarle" },
  { time: 185.35, text: "Sobre cuando me siento vulnerable" },
  { time: 190.69, text: "(Por ti sigo tratando, cavando)" },
  { time: 194.62, text: "Apapáchame la vida entera" },
  { time: 196.68, text: "Regando las flores que de viejos nos veo fumando" },
  { time: 201.83, text: "Quiero saberte a lo que quieres" },
  { time: 204.48, text: "Llorar por lo que te hace llorar" },
  { time: 206.75, text: "Ser música de la que prefieres" },
  { time: 209.63, text: "Y que nunca me quieras pausar 🌻💛" }
];

let lastActiveIndex = -1;

function initLyrics() {
  const container = document.getElementById("apple-lyrics");
  if (!container) return;

  container.innerHTML = "";
  
  // Espacio superior para centrar la primera línea en pantalla
  const topSpacer = document.createElement("div");
  topSpacer.style.height = "16vh";
  container.appendChild(topSpacer);

  lyricsData.forEach((item, index) => {
    const lineEl = document.createElement("p");
    lineEl.className = "apple-lyric-line";
    lineEl.id = `lyric-${index}`;
    lineEl.textContent = item.text;
    
    // Tocar cualquier línea para saltar a ese punto
    lineEl.addEventListener("click", () => {
      const audio = document.getElementById("bg-music");
      if (audio) {
        audio.currentTime = item.time;
        if (audio.paused) {
          playAudio();
        }
      }
    });

    container.appendChild(lineEl);
  });

  // Espacio inferior para permitir scroll completo
  const bottomSpacer = document.createElement("div");
  bottomSpacer.style.height = "40vh";
  container.appendChild(bottomSpacer);

  // Activar de inmediato la primera línea
  updateLyrics(0);
}

function updateLyrics(currentTime) {
  // Desvanecer el banner de la canción suavemente a medida que avanza la letra
  const songInfo = document.getElementById("song-info");
  if (songInfo) {
    if (currentTime >= 6.5) {
      songInfo.classList.add("hidden");
    } else {
      songInfo.classList.remove("hidden");
    }
  }

  let currentIndex = -1;

  for (let i = lyricsData.length - 1; i >= 0; i--) {
    if (currentTime >= lyricsData[i].time) {
      currentIndex = i;
      break;
    }
  }

  if (currentIndex !== -1 && currentIndex !== lastActiveIndex) {
    // Remover clase activa anterior
    if (lastActiveIndex !== -1) {
      const prevEl = document.getElementById(`lyric-${lastActiveIndex}`);
      if (prevEl) {
        prevEl.classList.remove("active");
        prevEl.classList.add("past");
      }
    }

    // Activar la línea actual
    const currentEl = document.getElementById(`lyric-${currentIndex}`);
    const container = document.getElementById("apple-lyrics");

    if (currentEl && container) {
      currentEl.classList.remove("past");
      currentEl.classList.add("active");

      // Auto-scroll suave centrado estilo Apple Music
      const targetScroll = currentEl.offsetTop - (container.clientHeight / 2) + (currentEl.clientHeight / 2);
      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth"
      });
    }

    lastActiveIndex = currentIndex;
  }
}

const musicNoteSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
const musicMutedSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;

function showTapHint() {
  const tapHint = document.getElementById("tap-hint");
  if (tapHint) {
    tapHint.classList.remove("hidden");
  }
}

function hideTapHint() {
  const tapHint = document.getElementById("tap-hint");
  if (tapHint) {
    tapHint.classList.add("hidden");
  }
}

function playAudio() {
  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  const flowers = document.querySelector(".flowers");

  hideTapHint();
  if (flowers) {
    flowers.classList.add("active-bloom");
  }

  if (audio) {
    audio.play().then(() => {
      hideTapHint();
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = musicNoteSvg;
      }
    }).catch(() => {
      showTapHint();
      if (musicBtn) {
        musicBtn.classList.remove("playing");
        musicBtn.innerHTML = musicMutedSvg;
      }
    });
  }
}

function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  if (!audio) return;

  if (audio.paused) {
    playAudio();
  } else {
    audio.pause();
    showTapHint();
    if (musicBtn) {
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = musicMutedSvg;
    }
  }
}

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  initLyrics();
});

window.addEventListener("load", () => {
  document.body.classList.remove("container");

  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  if (audio) {
    audio.addEventListener("play", () => {
      hideTapHint();
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = musicNoteSvg;
      }
    });

    audio.addEventListener("playing", () => {
      hideTapHint();
    });

    audio.addEventListener("pause", () => {
      showTapHint();
      if (musicBtn) {
        musicBtn.classList.remove("playing");
        musicBtn.innerHTML = musicMutedSvg;
      }
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio.paused) {
        hideTapHint();
      }
      updateLyrics(audio.currentTime);
    });
  }

  // Al tocar las flores o cualquier parte de la pantalla cuando esté pausado:
  const handleUserTap = (e) => {
    if (e.target && (e.target.closest("#music-btn") || e.target.closest(".ctrl-btn"))) {
      return;
    }
    if (audio && audio.paused) {
      playAudio();
    }
  };

  document.addEventListener("touchstart", handleUserTap, { passive: true });
  document.addEventListener("click", handleUserTap);
});

