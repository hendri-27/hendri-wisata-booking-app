<template>
  <div class="radial-progress-wrapper">
    <svg class="radial-progress" :viewBox="`${size/2} ${size/2} ${size} ${size}`">
      <circle
        class="underlay"
        :cx="size"
        :cy="size"
        :r="radius"
        stroke-width="4.590163934426229"
        fill="transparent"
      />
      <circle
        :cx="size"
        :cy="size"
        :r="radius"
        :stroke="fillColor"
        stroke-width="4.590163934426229"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        fill="transparent"
      />
    </svg>
    <div
      :style="
        `color: ${fillColor};`
      "
    >
      {{ progress }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadialProgress',
  props: {
    size: {
      type: Number,
      default: 100,
    },
    radius: {
      type: Number,
      default: 45,
    },
    progress: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    fillColor: {
      type: String,
      default: '#A11CB4'
    }
  },
  computed: {
    circumference() {
      return 2 * Math.PI * this.radius
    },
    dashOffset() {
      return this.circumference * (1 - this.progress / 100)
    }
  }
};
</script>

<style scoped>
.radial-progress-wrapper {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  position: relative;
  vertical-align: middle;
  height: 34px;
  width: 34px;
}

.radial-progress {
  transform: rotate(-90deg);
  bottom: 0;
  height: 100%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 0;

  .underlay {
    stroke: hsla(0,0%,62%,.4);
  }
}

.radial-info {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>