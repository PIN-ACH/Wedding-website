<template>
  <div class="wrapper">
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

    <!-- Overlay -->
    <div class="overlay"></div>

    <!-- Background Music -->
    <audio ref="music" loop preload="auto">
      <source :src="props.backgroundMusic" type="audio/mp3" />
    </audio>

    <!-- Music Toggle -->
    <button class="music-control" @click="toggleMusic" aria-label="Toggle music">
      {{ isPlaying ? "🔊" : "🔇" }}
    </button>

    <!-- CLOSED -->
    <div v-if="!opened" class="center-container">
      <div class="envelope-scene" @click="openEnvelope" role="button" aria-label="Open invitation">
        <div class="envelope" :class="{ open: envelopeOpening }">
          <div class="env-shadow"></div>

          <div class="env-body">
            <div class="env-paper"></div>
            <div class="gold-edge"></div>

            <!-- Letter (card) -->
            <div class="letter" aria-hidden="true">
              <div class="letter-inner">
		<div class="card-title shimmer">
                   {{ props.cardTitle }}
                </div>
                <div class="card-sub">With love & blessings</div>

                <div class="wax" aria-hidden="true">
                  <span class="wax-shine"></span>
                  <span class="wax-mark">✶</span>
                </div>
              </div>
            </div>

            <!-- Flap -->
            <div class="env-flap"></div>

            <!-- Pocket -->
            <div class="env-pocket"></div>

            <!-- Tap hint (NOT inside pocket, so it won’t get clipped) -->
            <div class="tap-hint" :class="{ hide: envelopeOpening }">
              Tap to open
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- OPEN -->
    <div v-else class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"

const props = defineProps({
  backgroundVideo: { type: String, required: true },
  backgroundMusic: { type: String, required: true },
  cardTitle: { type: String, required: true }   // 👈 ADD THIS
})


const opened = ref(false)
const envelopeOpening = ref(false)

const bgVideo = ref(null)
const music = ref(null)
const isPlaying = ref(false)
const userStartedMusic = ref(false)

const openEnvelope = async () => {
  if (envelopeOpening.value) return

  // Hide tap hint instantly
  envelopeOpening.value = true
    // Soft vibration (mobile supported browsers only)
  if (navigator.vibrate) {
    navigator.vibrate(20) // very soft
  }

  // Start music on user tap
  if (music.value && music.value.paused) {
    try {
      await music.value.play()
      isPlaying.value = true
      userStartedMusic.value = true
    } catch {}
  }

  // Add delay before the flap starts opening (premium feel)
  setTimeout(() => {
    document.documentElement.style.setProperty("--open-delay", "1")
  }, 0)

  // Reveal content after full animation
  setTimeout(() => {
    opened.value = true
  }, 1500)
}

const toggleMusic = async () => {
  if (!music.value) return
  if (music.value.paused) {
    try {
      await music.value.play()
      isPlaying.value = true
      userStartedMusic.value = true
    } catch {}
  } else {
    music.value.pause()
    isPlaying.value = false
  }
}

watch(
  () => props.backgroundMusic,
  async () => {
    if (!music.value) return
    music.value.load()

    if (userStartedMusic.value) {
      try {
        await music.value.play()
        isPlaying.value = true
      } catch {}
    } else {
      isPlaying.value = false
    }
  }
)

onMounted(() => {
  if (bgVideo.value) bgVideo.value.play().catch(() => {})
})
</script>

<style scoped>
/* ===== Base ===== */
.wrapper {
  position: relative;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
}

/* ===== Background Video ===== */
.video-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;
  filter: brightness(1.12) contrast(1.05) saturate(1.1);
}

/* ===== Overlay ===== */
.overlay {
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(60% 50% at 50% 30%, rgba(0,0,0,0.15), rgba(0,0,0,0.55)),
    linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.16));
}

/* ===== Music Button ===== */
.music-control {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 50;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(255, 215, 0, 0.95);
  color: #1a1a1a;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

/* ===== Centering ===== */
.center-container {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 18px;
}

/* ===== Envelope ===== */
.envelope-scene {
  perspective: 1500px;
}

.envelope {
  width: min(420px, 92vw);
  height: 260px;
  position: relative;
  transform-style: preserve-3d;
}

.env-shadow {
  position: absolute;
  inset: -25px -15px -35px -15px;
  background: radial-gradient(closest-side, rgba(0,0,0,0.6), transparent 70%);
  filter: blur(20px);
}

.env-body {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 70px rgba(0,0,0,0.55);
}

.env-paper {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,215,0,0.15), transparent 45%),
    linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.12));
}

.gold-edge {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  box-shadow:
    inset 0 0 0 1px rgba(255,215,0,0.18),
    inset 0 0 40px rgba(255,215,0,0.05);
}

/* ===== Flap ===== */
.env-flap {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  transform-origin: top center;

  /* starts closed */
  transform: rotateX(0deg);

  /* delay baked into transition for premium feel */
  transition: transform 900ms cubic-bezier(.2,.9,.2,1);
  background: linear-gradient(135deg, rgba(255,215,0,0.18), rgba(255,255,255,0.04));
  clip-path: polygon(0 0, 100% 0, 50% 64%);
}

/* ===== Pocket ===== */
.env-pocket {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55%;
  border-radius: 0 0 24px 24px;
  background: rgba(0,0,0,0.15);
  clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%);
}

/* ===== Tap Hint (perfectly centered + won’t clip) ===== */
.tap-hint {
  position: absolute;
  animation: pulseGlow 2.2s ease-in-out infinite;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  z-index: 10;

  padding: 10px 18px;
  border-radius: 999px;

  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: rgba(255,255,255,0.92);
  background: rgba(0,0,0,0.18);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(10px);

  box-shadow: 0 14px 35px rgba(0,0,0,0.25);
  transition: opacity 260ms ease, transform 260ms ease;
}

.tap-hint {
  animation: pulseGlow 2.2s ease-in-out infinite;
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 rgba(255,215,0,0);
  }
  50% {
    box-shadow: 0 0 18px rgba(255,215,0,0.35);
  }
  100% {
    box-shadow: 0 0 0 rgba(255,215,0,0);
  }
}

.tap-hint.hide {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
  pointer-events: none;
}

/* ===== Letter ===== */
.letter {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 18px;
  height: 200px;
  border-radius: 18px;
  background:
    radial-gradient(circle at 30% 25%, rgba(255,255,255,0.28), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.06));
  border: 1px solid rgba(255,255,255,0.25);

  transform: translateY(150px);
  opacity: 0;
  transition: transform 900ms cubic-bezier(.2,.9,.2,1), opacity 600ms ease;
}

.letter-inner {
  height: 100%;
  display: grid;
  place-items: center;
  padding: 18px;
  text-align: center;
  gap: 10px;
}

.card-title {
  font-size: 32px;
  letter-spacing: 1px;
}

.card-sub {
  font-size: 14px;
  opacity: 0.85;
}

/* Wax seal (optional but premium) */
.wax {
  margin-top: 6px;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  position: relative;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 30% 30%, rgba(255,0,0,0.76), rgba(90,0,0,0.95));
  box-shadow: 0 18px 36px rgba(0,0,0,0.35);
}
.wax-shine {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 45%);
}
.wax-mark {
  font-size: 18px;
  opacity: 0.9;
}

/* ===== Open animation ===== */
.envelope.open .env-flap {
  transform: rotateX(155deg);
}

.envelope.open .letter {
  transform: translateY(-25px);
  opacity: 1;
  transition-delay: 180ms;
}

/* ===== Shimmer ===== */
.shimmer {
  background: linear-gradient(90deg, #b38b2f, #ffeb9c, #b38b2f);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* ===== Content ===== */
.content {
  padding: 70px 18px 90px;
  animation: fadeIn 1.2s ease;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

