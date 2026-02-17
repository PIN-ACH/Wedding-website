export default {
  mounted(el) {
    el.classList.add("reveal-init")

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-show")
          io.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    io.observe(el)
  }
}

