<template>
  <InvitationCard backgroundVideo="/ring.mp4">
    <header class="hero">
      <h1 class="names shimmer">PINAK WEDS MEGHA</h1>
      <p class="tagline">Together with our families, we invite you to celebrate our union</p>

      <!-- Countdown -->
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
.hero {
  max-width: 980px;
  margin: 0 auto 26px;
  padding-top: 10px;
}

.names{
  font-family: var(--font-display);
  font-size: 56px;
  letter-spacing: 1.2px;
  margin: 0 0 10px;
  text-shadow: 0 18px 55px rgba(0,0,0,0.55);
  transition: transform 700ms ease, letter-spacing 700ms ease;
}

.names:hover{
  transform: translateY(-2px);
  letter-spacing: 1.6px;
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
  display: grid;
  gap: 10px;
  text-align: left;
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

/* shimmer */
.shimmer {
  background: linear-gradient(90deg, #b38b2f, #ffeb9c, #b38b2f);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 1.5s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@media (max-width: 520px) {
  .names { font-size: 40px; }
}
</style>

