<script setup>
import imageDefault from '~/assets/img/fallback-global.png'
const property = useProperty()
const idxImage= ref(0)
const imageValue = ref(null)
const isModalOpen = ref(false)

const imagesLen = computed(() => property.propertyContent?.image?.length)

const openModal = (image, index) => {
  idxImage.value = index
  imageValue.value = image
  isModalOpen.value = true
}

const prevImage = () => {
  if (idxImage.value - 1 < 0) {
    idxImage.value = imagesLen.value - 1
  } else {
    idxImage.value -= 1
  }
  imageValue.value = property.propertyContent?.image[idxImage.value]
}

const nextImage = () => {
  if (idxImage.value + 1 > imagesLen.value - 1) {
    idxImage.value = 0
  } else {
    idxImage.value += 1
  }

  imageValue.value = property.propertyContent?.image[idxImage.value]
}
</script>
<template>
  <div class="container grid grid-cols-3 gap-10">
    <div v-for="(image, index) in property.propertyContent?.image" :key="index" class="aspect-square w-full overflow-hidden hover:opacity-5 hover:ease-in-out">
      <img
        class="w-full h-full object-cover"
        :src="image.url.lg" 
        :alt="image.caption"
        @error="$event.target.src = imageDefault"
        @click="openModal(image, index)"
      />
    </div>
    <UModal
      v-model="isModalOpen"
      :ui="{
        width: 'image-modal',
        background: '',
        shadow: '',
        overlay: {
          background: 'bg-wb-black-100',
        }
      }"
    >
      <div class="flex w-full items-center justify-center gap-5">
        <div class="w-9 h-9 flex bg-neutral-600 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-500">
          <UIcon name="i-mdi-chevron-left" class="bg-white w-9 h-9" @click="prevImage" />
        </div>
        <div class="image-container">
          <img 
            :src="imageValue?.url.lg" 
            :alt="imageValue?.caption"
            class="w-full h-full object-contain"
            @error="$event.target.src = imageDefault"
          />
        </div>
        <div class="w-9 h-9 flex bg-neutral-600 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-500">
          <UIcon name="i-mdi-chevron-right" class="bg-white w-9 h-9" @click="nextImage" />
        </div>
      </div>
    </UModal>
  </div>
</template>

<style>
.image-modal {
  max-width: 75% !important;
  align-items: center;
}

.image-container {
  height: 100% !important;
  max-height: 69vh !important;
  max-width: 1000px !important;
  width: 100% !important;
  overflow: hidden;
}
</style>