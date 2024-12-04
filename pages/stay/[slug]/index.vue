<template>
  <div class="container">
    <div class="flex mt-1 mb-8 gap-[10px] justify-center">
      <div class="flex items-center">
        <UIcon
          name="i-mdi-filter-outline"
        />
        <span class="ml-1">Filter rooms by</span>
      </div>
      <div class="flex gap-[10px]">
        <UButton
          color="blue"
          variant="outline"
          icon="i-mdi-silverware-fork-knife"
          :ui="{ rounded: 'rounded-full' }"
        >
          Clear All
          <UBadge
            color="blue"
            class="w-[20px] h-[20px] justify-center"
            :ui="{
              rounded: 'rounded-full' 
            }"
          >
          {{ 1 }}
          </UBadge>
        </UButton>
        <UButton
          color="blue"
          variant="soft"
          icon="i-mdi-silverware-fork-knife"
          :ui="{ 
            rounded: 'rounded-full',
            color: {
              blue: {
                soft: 'ring-1 ring-[#C9C9C9] border-opacity-50 text-blue-500 bg-blue-100 hover:none'
              }
            }
          }"
        >
          Free Breakfast
        </UButton>
        <UButton
          color="gray"
          variant="outline"
          icon="i-mdi-credit-card-check-outline"
          :ui="{ rounded: 'rounded-full' }"
        >
          Free Cancellation
        </UButton>
      </div>
    </div>
  </div>
</template>