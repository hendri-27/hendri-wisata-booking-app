<script setup>
const property = useProperty()

const getFormattedLanguages = computed(() => {
  return property.getGeneralInfo?.spoken_languages ? Object.values(property.getGeneralInfo?.spoken_languages).map((val) => val.name).join(', ') + '.' : ''
})
</script>
<template>
  <div class="container pb-8">
    <section class="mt-8">
      <h2 class="font-medium text-xl">About the property</h2>
      <p>
        {{ property.getGeneralInfo?.descriptions?.location }} <br>
        {{ property.getGeneralInfo?.descriptions?.dining }} <br>
        {{ property.getGeneralInfo?.descriptions?.amenities }}
      </p>
      <h3 class="font-medium mt-4">Languages</h3>
      <p>{{ getFormattedLanguages }}</p>
    </section>
    <section class="mt-8">
      <h2 class="font-medium text-xl">Policies</h2>
      <div class="mt-5">
        <div class="flex gap-6">
          <h3>
            <p class="font-medium">Check-in</p>
            <p>{{ property.getImportantInfo?.checkin?.begin_time }}</p>
          </h3>
          <h3>
            <p class="font-medium">Check-out</p>
            <p>{{ property.getImportantInfo?.checkout?.time }}</p>
          </h3>
        </div>
        <div class="mt-3">
          <h3 class="font-medium">Additional check-in information</h3>
          <div class="custom-li" v-html="property.getImportantInfo?.checkin?.instructions" />
        </div>
        <div class="mt-3">
          <h3 class="font-medium">Others</h3>
          <div class="custom-li" v-html="property.getImportantInfo?.policies?.know_before_you_go" />
        </div>
      </div>
    </section>
    <section class="mt-8">
      <h2 class="font-medium text-xl">Important information</h2>
      <div class="mt-3">
        <h3 class="font-medium">Optional charges</h3>
        <div class="custom-li" v-html="property.getImportantInfo?.fees?.optional" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.custom-li :deep(li) {
  list-style-type: disc;
  margin-left: 1.5rem;
}
</style>