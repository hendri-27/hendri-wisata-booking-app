<template>
  <div class="icon-wrapper">
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :width="size" 
      :height="size"
      :class="customClass"
    >
      <path :d="path" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  customClass: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    required: true
  }
})
</script>