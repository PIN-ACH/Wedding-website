<template>
  <InvitationCard backgroundVideo="/video.mp4">
    <header class="hero">
      <div class="title">
        <div class="name-line shimmer  cinematic" style="--d: 0ms;">Pinak</div>
    
        <div class="weds-line cinematic" style="--d: 120ms;">
          <span class="weds">weds</span>
        </div>
    
        <div class="name-line shimmer  cinematic" style="--d: 240ms;">Megha</div>
      </div>
    
      <p class="tagline cinematic" style="--d: 360ms;">
        Together with our families, we invite you to celebrate our union
      </p>
    
      <!-- Countdown stays as-is -->
      <CountdownTimer
        label="Wedding Ceremony"
        targetISO="2026-04-21T19:00:00+05:30"
      />
    </header>

    <section class="glass" v-reveal>
      <h2 class="shimmer">Dear {{ guestName }},</h2>
      <p class="muted">You are cordially invited to our Wedding Ceremony.</p>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Date & Time</h2>
      <p>21 April 2026 • 7:00 PM</p>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Venue</h2>
      <p>Gokul Garden, Dwarka, New Delhi</p>
    </section>

    <section class="glass map" v-reveal>
      <iframe
        title="Venue Map"
        src="https://www.google.com/maps?q=New+Delhi&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Schedule</h2>
      <ul class="list">
        <li><b>7:00 PM</b> — Baraat & Welcome</li>
        <li><b>8:00 PM</b> — Wedding Rituals</li>
        <li><b>9:30 PM</b> — Dinner & Celebration</li>
      </ul>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Dress Code</h2>
      <p>Traditional / Formal</p>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">RSVP</h2>
      <p class="muted">Please confirm your presence.</p>
      <div class="buttons">
        <a class="btn" href="tel:+911234567890">Call</a>
        <a class="btn btn-outline" href="https://wa.me/911234567890" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
      <p class="note">Contact: +91 12345 67890 • +91 98765 43210</p>
    </section>

    <footer class="footer muted">
      We can’t wait to celebrate with you ✨
    </footer>
  </InvitationCard>
</template>

<script setup>
import { useRoute } from "vue-router"
import InvitationCard from "../components/InvitationCard.vue"
import CountdownTimer from "../components/CountdownTimer.vue"

const route = useRoute()
const guestName = route.params.guestName
</script>

<style scoped>
.hero{
  max-width: 1000px;
  margin: 0 auto 28px;
  padding-top: 6px;
}

.title{
  display: grid;
  gap: 8px;
  justify-items: center;
  margin-bottom: 10px;
}

/* Big name lines */
.name-line{
  font-family: "Prata", serif;
  font-size: clamp(46px, 6.2vw, 84px);
  letter-spacing: 3px;
  text-transform: uppercase;
  line-height: 0.95;
  text-shadow: 0 22px 60px rgba(0,0,0,0.55);
}

/* Weds separator */
.weds-line{
  display: flex;
  align-items: center;
  gap: 14px;
}

.weds{
  font-family: "Outfit", sans-serif;
  font-weight: 400;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-size: 14px;
  opacity: 0.9;
  position: relative;
}

/* Decorative lines left/right of WEDS */
.weds::before,
.weds::after{
  content: "";
  position: absolute;
  top: 50%;
  width: 70px;
  height: 1px;
  background: rgba(255,255,255,0.35);
}

.weds::before{ right: calc(100% + 14px); }
.weds::after{ left: calc(100% + 14px); }

.tagline{
  font-family: "Outfit", sans-serif;
  font-weight: 300;
  letter-spacing: 0.4px;
  opacity: 0.92;
  max-width: 760px;
  margin: 10px auto 0;
  line-height: 1.7;
}

/* Shimmer gold (classy, less flashy) */
/* Fallback text color so it never becomes "empty" */
/* Always-visible fallback (prevents blank text) */
/* Base text always visible */
/* Base text always visible */
.shimmer {
  background: linear-gradient(
    90deg,
    #c9a33a 0%,
    #fff4c4 40%,
    #c9a33a 80%
  );
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: shimmer 1.5s ease-in-out infinite;
}



/* ===== Cinematic Intro Animation =====
   Delay is controlled by --d inline style.
*/
.cinematic{
  opacity: 0;
  transform: translateY(14px);
  filter: blur(2px);
  animation: cinematicIn 900ms cubic-bezier(.2,.9,.2,1) forwards;
  animation-delay: var(--d, 0ms);
}

@keyframes cinematicIn{
  to{
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.hero {
  max-width: 980px;
  margin: 0 auto 26px;
  padding-top: 10px;
}

.names{
  font-family: "DM Serif Display", serif;
  font-size: clamp(42px, 6vw, 72px);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 400;

  background: linear-gradient(90deg, #d4af37, #f8e7a0, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  color: transparent;

  animation: shimmer 4s linear infinite;

  transition: all 0.6s ease;
}

.names:hover{
  letter-spacing: 4px;
}


h2{
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.8px;
  margin: 0 0 10px;
}

p, li{
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.7;
  font-size: 16px;
}


.heart {
  filter: drop-shadow(0 10px 16px rgba(0,0,0,0.35));
}

.tagline {
  max-width: 760px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.6;
}

.glass {
  max-width: 980px;
  margin: 18px auto;
  padding: 18px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(14px);
  box-shadow: 0 28px 60px rgba(0,0,0,0.40);
  transition: transform 500ms ease, box-shadow 500ms ease, border-color 500ms ease;
}
.glass:hover{
  transform: translateY(-3px);
  border-color: rgba(255,255,255,0.28);
  box-shadow: 0 36px 75px rgba(0,0,0,0.55);
}

.map iframe {
  width: 100%;
  height: 320px;
  border: 0;
  border-radius: 14px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;   /* centers items horizontally */
  gap: 12px;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 14px;
  flex-wrap: wrap;
}

.reveal-init{
  opacity: 0;
  transform: translateY(14px);
  filter: blur(2px);
}

.reveal-show{
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
  transition: opacity 900ms ease, transform 900ms ease, filter 900ms ease;
}


.btn {
  padding: 10px 16px;
  border-radius: 999px;
  text-decoration: none;
  color: #1a1a1a;
  background: rgba(255, 215, 0, 0.95);
  font-weight: 700;
  border: 1px solid rgba(255,255,255,0.2);
}

.btn-outline {
  background: rgba(255,255,255,0.10);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.25);
}

.footer {
  margin: 34px 0 10px;
  opacity: 0.85;
}

.muted { opacity: 0.85; }


@media (max-width: 520px) {
  .names { font-size: 40px; }
}
</style>

