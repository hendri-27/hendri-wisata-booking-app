<script setup>
const property = useProperty()

const getFormattedAddress = computed(() => {
  return `${property.propertyContent?.address_line}, ${property.propertyContent?.name_suffix} ${property.propertyContent?.catalog.postal_code}`
})
</script>

<template>
  <div class="flex pt-4 pb-8">
    <div class="flex flex-col items-center w-1/3">
      <UAvatar
        :src="property.propertyContent?.catalog.hero_image_url.md"
        :alt="property.propertyContent?.name"
        img-class="w-[100%] h-[100%]"
        class="w-[160px] h-[160px]"
      />
    </div>
    <div class="flex flex-col grow">
      <div class="flex align-center">
      <span class="font-bold pr-1 text-xl">{{ property.propertyContent?.name }}</span>
      <div class="flex items-center">
        <UIcon
          v-for="i in 5"
          name="i-heroicons-star-16-solid"
          :class="property.propertyContent?.catalog.star_rating >= i ? `bg-wb-orange` : ''"
        />
      </div>
      </div>
      <div class="py-1 text-wb-light-gray">{{ property.propertyContent?.catalog.category }}</div>
      <div class="pb-1">{{ getFormattedAddress }}</div>
      <div class="flex items-center gap-[10px] py-1">
      <RadialProgress :size="44.5902" :radius="20" :progress="property.propertyContent?.catalog.review_rating" />
      <div>Excellent · {{ property.propertyContent?.catalog.review_count }} reviews</div>
      </div>
    </div>
  </div>
</template>