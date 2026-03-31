<template>
  <InvitationCard
    backgroundVideo="/Haldi.mp4"
    backgroundMusic="/ring.mp3"
    cardTitle="Ring Ceremony">
    <header class="hero">
      <div class="title">
	<div class="weds-line cinematic" style="--d: 120ms;">
          <span class="weds">Haldi & Mehendi</span>
        </div>
        <div class="name-line shimmer  cinematic" style="--d: 0ms;">Pinak</div>
      </div>
    
      <p class="tagline cinematic" style="--d: 360ms;">
          A splash of turmeric, a swirl of henna, and a celebration of love.
      </p>
    
      <!-- Countdown stays as-is -->
      <CountdownTimer
        label="Haldi & Mehendi Ceremony"
        targetISO="2026-04-20T15:00:00+05:30"
      />
    </header>

    <section class="glass" v-reveal>
      <h2 class="shimmer">
	  Dear <span class="guest-name">{{ guestName }}</span>,
      </h2>
      <p class="invite-text">
  With the blessings of our beloved parents and elders,<br /><br />

  we joyfully invite you to celebrate <br />
  <span class="highlight shimmer">Haldi & Mehendi Ceremony</span><br /><br />

  filled with colors, laughter, music,<br/>
  and the warmth of togetherness.<br /><br/>

  Your presence and blessings<br />
  will make this celebration even more special.
</p>

    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Date & Time</h2>
      <p>20 April 2026 • 3:00 PM</p>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Venue</h2>
        <div class="venue-name">Bricks and Barrel Villa </div>

  <div class="venue-address">
    Located in: Dwarka Expressway sector 109<br/>
    Gurugram, Haryana
  </div>
    </section>

    <section class="glass map" v-reveal>
      <iframe
        title="Venue Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.735660313874!2d77.01053147495222!3d28.51003788963382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19ffa6fdbadd%3A0x1322493291551ee8!2sGurgaon%20Kalibari!5e1!3m2!1sen!2sin!4v1774952889076!5m2!1sen!2sin"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Schedule</h2>
      <ul class="list">
        <li><b>2:00 PM</b> — Haldi Ceremony</li>
	<li><b>3:00 PM</b> — Lunch</li>
        <li><b>7:00 PM</b> — Mehendi Ceremony and DJ Night</li>
        <li><b>8:00 PM</b> — Dinner</li>
      </ul>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">Dress Code</h2>
      <p>
      For Haldi, embrace the joy of yellow hues 🌼<br/>
  For Mehendi, feel free to wear any vibrant festive colors 🌿✨<br/><br/>
  Let’s fill the celebration with color, tradition, and happiness!</p>
    </section>

    <section class="glass" v-reveal >
      <h2 class="shimmer">With Love & Respect,</h2>
      <p class="muted">Should you require any assistance regarding the ceremony,<br/>
please feel free to connect with us.<br/>
We’ll be busy exchanging rings, but we’ll still try to answer! 💍📞</p>
      <div class="buttons">
        <a class="btn" href="tel:+917048994913">Call</a>
        <a class="btn btn-outline" href="https://wa.me/917048994913" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
      <p class="note">Contact: +91 7048994913</p>
    </section>

    <footer class="footer muted">
      Join us as we celebrate love, laughter, and new beginnings. 💛✨
    </footer>
  </InvitationCard>
</template>

<script setup>
import { useRoute } from "vue-router"
import InvitationCard from "../components/InvitationCard.vue"
import CountdownTimer from "../components/CountdownTimer.vue"
import CinematicText from "../components/CinematicText.vue"

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
  font-size: 35px;
  opacity: 0.9;
  position: relative;
}

.guest-name {
  font-weight: 700;
  font-size: 1.5em;
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
.venue-name {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.venue-address {
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 14px;
}


.tagline{
  font-family: "Outfit", sans-serif;
  font-weight: 300;
  letter-spacing: 0.4px;
  opacity: 0.92;
  max-width: 760px;
  margin: 10px auto 0;
  line-height: 1.7;
}
.invite-text {
  font-size: 18px;
  line-height: 1.9;
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}

.highlight {
  font-weight: 600;
  letter-spacing: 1px;
}

/* Shimmer gold (classy, less flashy) */
/* Fallback text color so it never becomes "empty" */
/* Always-visible fallback (prevents blank text) */
/* Base text always visible */
/* Base text always visible */

.shimmer {
  color: #fff700;
  background: linear-gradient(90deg, #fff700, #aaff00, #fff700, #ffe000, #fff700);
  background-size: 400% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 6px rgba(220,255,0,1)) drop-shadow(0 0 18px rgba(160,255,0,0.7));
  animation: neonWave 4s ease-in-out infinite;
}

@keyframes neonWave {
  0%,100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 6px rgba(220,255,0,1)) drop-shadow(0 0 18px rgba(160,255,0,0.7));
  }
  50% {
    background-position: 100% 50%;
    filter: drop-shadow(0 0 12px rgba(220,255,0,1)) drop-shadow(0 0 35px rgba(160,255,0,0.9));
  }
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
  backdrop-filter: blur(3px);
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

