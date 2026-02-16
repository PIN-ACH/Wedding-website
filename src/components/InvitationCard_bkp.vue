<template>
  <div class="page-wrapper">

    <!-- Background Video -->
    <video
      class="video-bg"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>

    <!-- Dark Overlay -->
    <div class="dark-overlay"></div>

    <!-- Background Music -->
    <audio ref="music" loop autoplay>
      <source src="/music.mp3" type="audio/mp3" />
    </audio>

    <!-- Music Control -->
    <div class="music-control" @click="toggleMusic">
      {{ isPlaying ? '🔊' : '🔇' }}
    </div>

    <!-- Closed Card -->
    <div v-if="!opened" class="invite-container">
      <div class="invite-card" @click="openCard">
        Tap to Open Invitation
      </div>
    </div>

    <!-- Opened Content -->
    <div v-else class="content">
      <slot />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const opened = ref(false)
const isPlaying = ref(true)
const music = ref(null)

const openCard = () => {
  opened.value = true
}

const toggleMusic = () => {
  if (!music.value) return

  if (music.value.paused) {
    music.value.play()
    isPlaying.value = true
  } else {
    music.value.pause()
    isPlaying.value = false
  }
}

onMounted(() => {
  if (music.value) {
    music.value.play().catch(() => {
      isPlaying.value = false
    })
  }
})
</script>

<style scoped>
.page-wrapper {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  color: white;
}

/* Fullscreen Background Video */
.video-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

/* Dark Overlay */
.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.55);
  z-index: -1;
}

/* Closed Card */
.invite-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.invite-card {
  width: 340px;
  height: 200px;
  background: linear-gradient(135deg,#b9935a,#8e6f3e);
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  transition: 0.6s ease;
}

.invite-card:hover {
  transform: scale(1.05);
}

/* Opened Content */
.content {
  padding: 60px 20px;
  animation: fadeIn 1.5s ease;
}

.music-control {
  position: fixed;
  top: 20px;
  right: 20px;
  background: gold;
  color: black;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
}

@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
</style>

