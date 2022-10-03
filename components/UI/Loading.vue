<template>
  <div v-bind:style="styles" class="spinner spinner--cube-shadow mx-auto mt-28 w-full p-10"></div>
</template>

<script>
export default {
  props: {
    size: {
      default: "40px"
    },
    background: {
      default: "#F77A5A"
    },
    duration: {
      default: "1.8s"
    }
  },
  computed: {
    styles() {
      return {
        width: this.size,
        height: this.size,
        backgroundColor: this.background,
        animationDuration: this.duration
      }
    }
  }
}
</script>

<style scoped>
.spinner {
  animation: cube-shadow-spinner 1.8s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}
@keyframes cube-shadow-spinner {
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
}
</style>
