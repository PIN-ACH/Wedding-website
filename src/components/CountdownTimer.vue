<template>
  <div class="countdown">
    <div class="label shimmer">Countdown to {{ label }}</div>

    <div class="grid">
      <div class="box">
        <div class="num">{{ timeLeft.days }}</div>
        <div class="txt">Days</div>
      </div>
      <div class="box">
        <div class="num">{{ timeLeft.hours }}</div>
        <div class="txt">Hours</div>
      </div>
      <div class="box">
        <div class="num">{{ timeLeft.minutes }}</div>
        <div class="txt">Minutes</div>
      </div>
      <div class="box">
        <div class="num">{{ timeLeft.seconds }}</div>
        <div class="txt">Seconds</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  targetISO: { type: String, required: true },  // e.g. "2026-12-25T19:00:00+05:30"
  label: { type: String, default: "The Big Day" }
})

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer = null

function pad(n) {
  return String(n).padStart(2, "0")
}

function update() {
  const target = new Date(props.targetISO).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / (24 * 3600))
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  timeLeft.value = {
    days,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  }
}

onMounted(() => {
  update()
  timer = setInterval(update, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.countdown {
  margin: 34px auto 10px;
  max-width: 860px;
  padding: 18px 14px 22px;
  border-radius: 18px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(3px);
  box-shadow: 0 28px 60px rgba(0,0,0,0.45);
}

.label {
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 14px;
  opacity: 0.95;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.box {
  padding: 14px 10px;
  border-radius: 14px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.14);
}

.num {
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
}

.txt {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.85;
  letter-spacing: 1px;
}

.shimmer {
  background: linear-gradient(90deg, #b38b2f, #ffeb9c, #b38b2f);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 2.4s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@media (max-width: 520px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
</style>

