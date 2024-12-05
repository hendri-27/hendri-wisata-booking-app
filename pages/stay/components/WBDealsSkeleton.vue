<template>
  <div class="container">
    <div v-for="i in 6" class="stay-offer-grid grid grid-cols-[minmax(200px,_4fr)_8fr] grid-rows-[auto_1fr] gap-x-4 mb-10" >
      <div class="stay-offer-grid__room-catalog v-sheet--outlined p-4 max-h-fit">
        <div class="flex justify-between items-center">
          <USkeleton class="h-3 w-[300px]" :ui="{
            background: 'bg-gray-200'
          }" />
        </div>
      </div>
      <div class="stay-offer-grid__room-images overflow-hidden rounded-lg">
        <USkeleton class="h-[200px] w-full" :ui="{
          background: 'bg-gray-200'
        }" />
      </div>
      <div class="stay-offer-grid__room-offer v-sheet--outlined p-4">
        <div class="flex justify-between items-stretch">
          <div class="flex flex-col flex-[1_0_0%] gap-2">
            <USkeleton class="h-3 w-[200px]" :ui="{
              background: 'bg-gray-200'
            }" />
            <USkeleton class="h-3 w-[150px]" :ui="{
              background: 'bg-gray-200'
            }" />
          </div>
          <div class="flex flex-[0_0_auto] min-w-[144px] justify-end items-start gap-2">
            <USkeleton class="h-6 w-6" :ui="{
              background: 'bg-gray-200',
              rounded: 'rounded-full'
            }" />
            <USkeleton class="h-6 w-6" :ui="{
              background: 'bg-gray-200',
              rounded: 'rounded-full'
            }" />
            <USkeleton class="h-6 w-6" :ui="{
              background: 'bg-gray-200',
              rounded: 'rounded-full'
            }" />
          </div>
        </div>
        <div class="flex justify-between items-stretch mt-10">
          <div class="flex flex-col flex-[1_0_0%] gap-2">
            <USkeleton class="h-3 w-[200px]" :ui="{
              background: 'bg-gray-200'
            }" />
            <USkeleton class="h-3 w-[150px]" :ui="{
              background: 'bg-gray-200'
            }" />
          </div>
          <div class="flex flex-[0_0_auto] min-w-[144px] justify-end items-start gap-2">
            <USkeleton class="h-[40px] w-[110px]" :ui="{
              background: 'bg-gray-200',
              rounded: 'rounded-lg'
            }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>