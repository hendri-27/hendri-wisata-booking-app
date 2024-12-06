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
    <div class="appbartop-grid flex container m-auto py-5 px-3">
      <img src="~/assets/img/logo.png" class="flex-none h-[42px]"/>
      <div class="flex justify-center">
        <div class="w-full max-w-[590px]">
          <UButton 
            color="gray"
            variant="soft"
            icon="i-heroicons-magnifying-glass-16-solid"
            class="h-10 text-black w-full justify-center"
          >
            Fairmont Jakarta • 4 - 8 Mar 2025
          </UButton>
        </div>
      </div>
      <UButton color="blue" variant="solid" class="flex-none h-10 text-white">Sign in</UButton>
    </div>
  </div>
</template>

<style scoped>
.shadow-bottom {
  box-shadow: 0 1px 0 0 rgba(0,0,0,.12);
}
</style>