<script lang="ts" setup>
const showShadowBottom = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  showShadowBottom.value = window.scrollY > 50
}
</script>
<template>
  <div 
    class="sticky top-0 z-[1] bg-white"
    :class="{ 'shadow-bottom': showShadowBottom }"
  >
    <div class="flex container m-auto py-5">
      <img src="~/assets/img/logo.png" class="flex-none h-[42px]"/>
      <div class="w-full mx-24">
      <UButton block color="gray" variant="soft" icon="i-heroicons-magnifying-glass-16-solid" class="h-10 text-black">Fairmont Jakarta • 4 - 8 Mar 2025</UButton>
      </div>
      <UButton color="blue" variant="solid" class="flex-none h-10 text-white">Sign in</UButton>
    </div>
  </div>
</template>