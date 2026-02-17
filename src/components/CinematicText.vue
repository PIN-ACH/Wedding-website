<template>
  <span class="cinematic-text">
    <span
      v-for="(char, index) in letters"
      :key="index"
      class="letter"
      :style="{ animationDelay: index * 80 + 'ms' }"
    >
      {{ char === " " ? "\u00A0" : char }}
    </span>
  </span>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  text: { type: String, required: true }
})

const letters = computed(() => props.text.split(""))
</script>

<style scoped>
.cinematic-text {
  display: inline-block;
}

/* These letters will inherit shimmer via parent,
   but we also ensure they render correctly in clipped text cases */
.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(18px);
  animation: letterIn 0.7s ease forwards;

  /* Key: ensure the gradient-clip works on the glyphs */
  -webkit-text-fill-color: currentColor;
}

@keyframes letterIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

