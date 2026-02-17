<template>
  <div class="wrapper">
  <div class="particles"></div>

    <!-- Background Video -->
    <video
      ref="bgVideo"
      class="video-bg"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    >
      <source :src="props.backgroundVideo" type="video/mp4" />
    </video>

    <!-- Cinematic overlay -->
    <div class="overlay"></div>

    <!-- Background music -->
    <audio ref="music" loop preload="auto">
      <source :src="backgroundMusic" type="audio/mp3" />
    </audio>

    <!-- Music toggle -->
    <button class="music-control" @click="toggleMusic" aria-label="Toggle music">
      {{ isPlaying ? "🔊" : "🔇" }}
    </button>

    <!-- CLOSED: Envelope -->
    <div v-if="!opened" class="center-container">
      <div class="envelope-scene" @click="openEnvelope" role="button" aria-label="Open invitation">
        <div class="envelope" :class="{ open: envelopeOpening }">
          <!-- back -->
          <div class="env-back"></div>

          <!-- letter -->
          <div class="letter">
            <div class="letter-inner">
              <div class="shimmer-title">Wedding Invitation</div>
              <div class="letter-sub">Tap to open</div>
              <div class="wax">
                <span class="wax-dot"></span>
              </div>
            </div>
          </div>

          <!-- flap -->
          <div class="env-flap"></div>

          <!-- front -->
          <div class="env-front"></div>
        </div>
      </div>
    </div>

    <!-- OPEN: Content -->
    <div v-else class="content">
      <slot />
    </div>

  </div>
</template>

<script setup>
import { watch } from "vue"
import { ref, onMounted } from "vue"

const props = defineProps({
  backgroundVideo: {
    type: String,
    required: true
  },
  backgroundMusic: {
    type: String,
    required: true
  }
})

watch(() => props.backgroundMusic, async () => {
  if (!music.value) return
  music.value.load()
  try {
    await music.value.play()
    isPlaying.value = true
  } catch {}
})


const opened = ref(false)
const envelopeOpening = ref(false)

const bgVideo = ref(null)
const music = ref(null)
const isPlaying = ref(false)

const openEnvelope = async () => {
  // play envelope animation first
  envelopeOpening.value = true

  // try to start music on user interaction (browser-friendly)
  if (music.value && music.value.paused) {
    try {
      await music.value.play()
      isPlaying.value = true
    } catch {}
  }

  // reveal content after animation
  setTimeout(() => {
    opened.value = true
  }, 1050)
}

const toggleMusic = async () => {
  if (!music.value) return
  if (music.value.paused) {
    try {
      await music.value.play()
      isPlaying.value = true
    } catch {}
  } else {
    music.value.pause()
    isPlaying.value = false
  }
}

onMounted(() => {
  // force video play attempt
  if (bgVideo.value) bgVideo.value.play().catch(() => {})

  // don't force music autoplay; most browsers block until interaction
})
</script>

<style scoped>
/* ====== Base ====== */
.wrapper {
  position: relative;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
}

/* ====== Background Video ====== */
.video-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;

  filter:
    brightness(1.15)
    contrast(1.05)
    saturate(1.1);
}


@keyframes cinematicZoom {
  to {
    transform: scale(1);
  }
}
.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.particles::before,
.particles::after {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  background-image:
    radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: floatParticles 60s linear infinite;
  opacity: 0.25;
}

.particles::after {
  animation-duration: 90s;
  opacity: 0.15;
}

@keyframes floatParticles {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-500px);
  }
}



/* ====== Cinematic Overlay ====== */
.overlay {
  position: fixed;
  inset: 0;
  z-index: -2;

  background:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.25)
    );
}


/* ====== Music Control ====== */
.music-control {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 20;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(255, 215, 0, 0.92);
  color: #1a1a1a;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

/* ====== Center container ====== */
.center-container {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;   /* safe padding */
}


/* ====== Envelope 3D ====== */
.envelope-scene {
  perspective: 1200px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.envelope {
  width: min(380px, 90vw);
  max-width: 380px;
  height: 240px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s ease;
  filter: drop-shadow(0 30px 60px rgba(0,0,0,0.65));
}

/* subtle float */
.envelope-scene:hover .envelope {
  transform: translateY(-4px);
}

.env-back,
.env-front,
.env-flap {
  position: absolute;
  inset: 0;
  border-radius: 18px;
}

/* back */
.env-back {
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.20);
  backdrop-filter: blur(14px);
}

/* front pocket */
.env-front {
  background:
    linear-gradient(135deg, rgba(255,215,0,0.18), rgba(255,255,255,0.08));
  border: 1px solid rgba(255,255,255,0.18);
  clip-path: polygon(0 55%, 50% 85%, 100% 55%, 100% 100%, 0 100%);
  backdrop-filter: blur(14px);
}

/* flap */
.env-flap {
  background:
    linear-gradient(135deg, rgba(255,215,0,0.28), rgba(255,255,255,0.06));
  border: 1px solid rgba(255,255,255,0.18);
  clip-path: polygon(0 0, 100% 0, 50% 65%);
  transform-origin: top center;
  transform: rotateX(0deg);
  transition: transform 1s ease;
  backface-visibility: hidden;
}

/* letter */
.letter {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  height: 200px;
  border-radius: 14px;
  background: rgba(10,10,10,0.28);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(16px);
  transform: translateY(34px);
  transition: transform 1s ease;
  overflow: hidden;
}

.letter-inner {
  height: 100%;
  display: grid;
  place-items: center;
  padding: 18px;
  text-align: center;
  gap: 10px;
}

.letter-sub {
  opacity: 0.85;
  letter-spacing: 1px;
  font-size: 14px;
}

/* wax seal */
.wax {
  margin-top: 8px;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(255,0,0,0.75), rgba(120,0,0,0.9));
  box-shadow: 0 16px 30px rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
}
.wax-dot {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: rgba(255,255,255,0.65);
}

/* Opening animation */
.envelope.open .env-flap {
  transform: rotateX(155deg);
}

.envelope.open .letter {
  transform: translateY(-22px);
}

/* ====== Shimmer Gold Text ====== */
.shimmer-title {
  font-size: 26px;
  letter-spacing: 2px;
  font-weight: 700;
  background: linear-gradient(90deg, #b38b2f, #ffeb9c, #b38b2f);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 2.4s linear infinite;
  text-transform: uppercase;
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* ====== Open content ====== */
.content {
  padding: 70px 18px 90px;
  animation: fadeIn 1.2s ease;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 420px) {
  .envelope { width: 330px; height: 220px; }
}
</style>

