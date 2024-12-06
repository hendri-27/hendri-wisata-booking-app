<script lang="ts" setup>
import imageDefault from '~/assets/img/fallback-global.png'
import WBDealsSkeleton from '../components/WBDealsSkeleton.vue'

const stay = useStay()
const property = useProperty()
const amenity = useAmenity()

const offerDetail = ref<RoomModel>()
const roomDetail = ref<RoomResponse>()
const roomId = ref<string>("")
const isModalOpen = ref(false)
const idxImage = ref(0)
const imagesLen = computed(() => roomDetail.value?.images.length ?? 0)
const imageValue = ref<ImageModel | null>(null)

const openModal = (offer : RoomModel, id: string) => {
  offerDetail.value = offer
  amenity.groupByCategory(property.propertyContent?.room[id].amenities ?? {})
  roomDetail.value = property.propertyContent?.room[id]
  imageValue.value = roomDetail.value?.images[idxImage.value] ?? null
  roomId.value = id
  isModalOpen.value = true
}

const prevImage = () => {
  if (idxImage.value - 1 < 0) {
    idxImage.value = imagesLen.value - 1
  } else {
    idxImage.value -= 1
  }
  imageValue.value = roomDetail.value?.images[idxImage.value] ?? null
}

const nextImage = () => {
  if (idxImage.value + 1 > imagesLen.value - 1) {
    idxImage.value = 0
  } else {
    idxImage.value += 1
  }

  imageValue.value = roomDetail.value?.images[idxImage.value] ?? null
}
</script>

<template>
  <div class="container">
    <div v-if="stay.isLoadingFilter" class="flex mt-1 mb-8 justify-center">
      <USkeleton class="h-3 w-[450px]" :ui="{
        background: 'bg-gray-200'
      }" />
    </div>
    <div v-else class="flex mt-1 mb-8 gap-[10px] justify-center">
        <div class="flex items-center">
          <UIcon
            name="i-mdi-filter-outline"
          />
          <span class="ml-1">Filter rooms by</span>
        </div>
        <div class="flex gap-[10px]">
          <UButton
            v-if="stay.filters.length > 0"
            color="blue"
            variant="outline"
            :ui="{ rounded: 'rounded-full' }"
            @click="stay.clearAllFilter()"
          >
            Clear All
            <UBadge
              color="blue"
              class="w-[20px] h-[20px] justify-center"
              :ui="{
                rounded: 'rounded-full' 
              }"
            >
            {{ stay.filters.length }}
            </UBadge>
          </UButton>
          <UButton
            color="gray"
            variant="outline"
            icon="i-mdi-silverware-fork-knife"
            :ui="{
              rounded: 'rounded-full',
              color: {
                gray: {
                  outline: `ring-1 ring-[#C9C9C9] border-opacity-50 ${stay.hasFilter('BB') ? 'text-blue-500 bg-blue-100 hover:none' : 'text-wb-light-gray-100 hover:bg-gray-100'}`
                }
              }
            }"
            @click="stay.addFilter('BB')"
          >
            Free Breakfast
          </UButton>
          <UButton
            color="gray"
            variant="outline"
            icon="i-mdi-credit-card-check-outline"
            :ui="{
              rounded: 'rounded-full',
              color: {
                gray: {
                  outline: `ring-1 ring-[#C9C9C9] border-opacity-50 ${stay.hasFilter('FC') ? 'text-blue-500 bg-blue-100 hover:none' : 'text-wb-light-gray-100 hover:bg-gray-100'}`
                }
              }
            }"
            @click="stay.addFilter('FC')"
          >
            Free Cancellation
          </UButton>
        </div>
    </div>

    <WBDealsSkeleton v-if="stay.isLoading" />
    <div v-else class="container">
      <div v-for="(offer, id) in stay.roomOffers" class="stay-offer-grid grid grid-cols-[minmax(200px,_4fr)_8fr] gap-x-4 mb-10">
        <div class="stay-offer-grid__room-catalog v-sheet--outlined p-4">
          <div class="flex justify-between items-center">
            <div class="text-lg font-medium">{{ offer.room_name }}</div>
            <UButton
              color="blue"
              variant="ghost"
              :ui="{
                rounded: 'rounded-full'
              }"
              @click="openModal(offer, offer.room_data.id)"
            >
              See details
            </UButton>
          </div>
          <div class="inline-flex flex-wrap gap-2">
            <span class="flex items-center gap-1">
              <UIcon
                name="i-mdi-bed-king-outline"
                class="w-[18px] h-[18px] bg-wb-light-gray-100"
              />
              <span>{{ offer.room_bed_groups }}</span>
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-mdi-arrow-expand-vertical"
                class="w-[18px] h-[18px] bg-wb-light-gray-100"
              />
              <span>{{ offer.room_size_sqm }} m<sup>2</sup></span>
            </span>
          </div>
        </div>
        <div class="stay-offer-grid__room-images overflow-hidden rounded-lg min-w-fit" @click="openModal(offer, offer.room_data.id)">
          <div class="grid gap-0.5 stay-availability-room-images--grid cursor-pointer">
            <div style="grid-area: main;">
              <div class="relative">
                <div class="relative overflow-hidden pb-[54.5455%]">
                  <img
                    class="absolute w-full h-full object-cover"
                    :src="offer.room_images?.[0]?.size_sm || imageDefault"
                    :alt="offer.room_images?.[0]?.caption || 'Image is not available'"
                    @error="(e: any) => {
                      e.target.src = imageDefault;
                      e.target.alt = 'Image is not available';
                    }"
                  />
                  <div class="flex absolute bottom-0 left-0 shadow-md rounded justify-center items-center px-2 py-1 m-4 gap-1 bg-white">
                    <UIcon
                      name="i-mdi-grid"
                      class="font-medium"
                    />
                    <span class="text-xs font-medium">See Photos</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative" style="grid-area: other-1;">
              <div class="relative w-full pb-[75%] overflow-hidden">
                <img
                  class="absolute w-full h-full object-cover"
                  :src="offer.room_images?.[1]?.size_sm || imageDefault"
                  :alt="offer.room_images?.[1]?.caption || 'Image is not available'"
                  @error="(e: any) => {
                      e.target.src = imageDefault;
                      e.target.alt = 'Image is not available';
                  }"
                />
              </div>
            </div>
            <div class="relative" style="grid-area: other-2;">
              <div class="relative w-full pb-[75%] overflow-hidden">
                <img
                  class="absolute w-full h-full object-cover"
                  :src="offer.room_images?.[2]?.size_sm || imageDefault"
                  :alt="offer.room_images?.[2]?.caption || 'Image is not available'"
                  @error="(e: any) => {
                    e.target.src = imageDefault;
                    e.target.alt = 'Image is not available';
                  }"
                />
              </div>
            </div>
            <div class="relative" style="grid-area: other-3;">
              <div class="relative w-full pb-[75%] overflow-hidden">
                <img
                  class="absolute w-full h-full object-cover"
                  :src="offer.room_images?.[3]?.size_sm || imageDefault"
                  :alt="offer.room_images?.[3]?.caption || 'Image is not available'"
                  @error="(e: any) => {
                    e.target.src = imageDefault;
                    e.target.alt = 'Image is not available';
                  }"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="stay-offer-grid__room-offer v-sheet--outlined">
          <div v-for="room in offer.grouped_rooms" class="py-4 p-4">
            <hr class="mt-[-16px] mx-[-16px] mb-4" />
            <div class="flex justify-between items-stretch">
              <div class="flex flex-col flex-[1_0_0%]">
                <div class="flex items-center gap-1">
                  <UIcon
                    :name="`i-mdi-food${ stay.isFreeFood(room.meal_plan_code) ? '' : '-off'}`"
                    :class="`${ stay.isFreeFood(room.meal_plan_code) ? 'bg-green-700' : 'bg-wb-light-gray-100'}`"
                  />
                  <span :class="`${ stay.isFreeFood(room.meal_plan_code) ? 'text-green-700' : '' }`">{{ stay.isFreeFood(room.meal_plan_code) ? room.meal_plan_description : 'Without breakfast' }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <UIcon
                    :name="`i-mdi-credit-card-${ stay.isFreeCancel(room.cancel_policy_code) ? 'check' : 'remove'}-outline`"
                    :class="`${ stay.isFreeCancel(room.cancel_policy_code) ? 'bg-green-700' : 'bg-wb-light-gray-100'}`"
                  />
                  <span :class="`${ stay.isFreeCancel(room.cancel_policy_code) ? 'text-green-700' : '' }`">{{ room.cancel_policy_description }}</span>
                </div>
              </div>
              <div class="flex flex-[0_0_auto] min-w-[144px] justify-end items-start">
                <UTooltip
                  text="Copy offer"
                  :popper="{ placement: 'top' }"
                  :ui="{
                    ring: '',
                    background: 'bg-gray-500',
                    color: 'text-white',
                    base: 'h-8 px-4 py-2 relative justify-center text-center'
                  }"
                >
                  <UButton 
                    icon="i-mdi-content-copy"
                    color="gray"
                    variant="ghost"
                    :ui="{
                      rounded: 'rounded-full',
                      color: {
                        gray: {
                          ghost: `hover:text-gray-700`
                        }
                      }
                    }"
                  />
                </UTooltip>
                <UTooltip
                  text="Screenshot offer"
                  :popper="{ placement: 'top' }"
                  :ui="{
                    ring: '',
                    background: 'bg-gray-500',
                    color: 'text-white',
                    base: 'h-8 px-4 py-2 relative justify-center text-center'
                  }"
                >
                  <UButton 
                    icon="i-mdi-focus-field-horizontal"
                    color="gray"
                    variant="ghost"
                    :ui="{
                      rounded: 'rounded-full',
                      color: {
                        gray: {
                          ghost: `hover:text-gray-700`
                        }
                      }
                    }"
                  />
                </UTooltip>
                <UTooltip
                  text="See all action"
                  :popper="{ placement: 'top' }"
                  :ui="{
                    ring: '',
                    background: 'bg-gray-500',
                    color: 'text-white',
                    base: 'h-8 px-4 py-2 relative justify-center text-center'
                  }"
                >
                  <UPopover class="flex justify-center" :popper="{ placement: 'bottom-end' }">
                    <UButton
                      icon="i-mdi-dots-horizontal"
                      color="gray"
                      variant="ghost"
                      :ui="{
                        rounded: 'rounded-full',
                        color: {
                          gray: {
                            ghost: `hover:text-gray-700`
                          }
                        }
                      }"
                    />
                    
                    <template #panel>
                      <div class="flex flex-col p-2 gap-2">
                        <div class="px-2 py-2 text-xs">ACTIONS</div>
                        <div class="flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:rounded">
                          <UIcon
                            name="i-mdi-content-copy"
                            class="mr-3"
                          />
                          <span>Copy offer</span>
                        </div>
                        <div class="flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:rounded">
                          <UIcon
                            name="i-mdi-focus-field-horizontal"
                            class="mr-3"
                          />
                          <span>Screenshot offer</span>
                        </div>
                      </div>
                    </template>
                  </UPopover>
                </UTooltip>
              </div>
            </div>
            <div class="mt-4">
              <div class="grid price-display-grid--split">
                <div style="grid-area: rate-nightly;">
                  <p class="flex gap-1 items-center">
                    <span class="text-sm font-medium">Rp</span>
                    <span class="text-lg font-medium">{{ formatThousandSeparator(room.pricing_data.net_rate_nightly_with_bonus) }}</span>
                    <span class="text-sm"> / night</span>
                    <UIcon
                      name="i-mdi-asterisk"
                      class="h-2 w-2 align-super"
                    />
                  </p>
                </div>
                <div style="grid-area: btn;">
                  <UButton
                    color="blue"
                    size="lg"
                    class="px-6"
                  >
                    Book Now
                  </UButton>
                </div>
                <div style="grid-area: total-price;">
                  <p class="text-wb-light-gray-100">Total · Rp {{ formatThousandSeparator(room.pricing_data.net_price_total_with_bonus) }}</p>
                </div>
                <div style="grid-area: tax-fees;">
                  <p class="text-wb-light-gray-200 text-sm">after tax & fees</p>
                </div>
                <div class="flex items-baseline justify-between" style="grid-area: disclaimer;">
                  <p class="flex justify-start items-center gap-1">
                    <UIcon
                      name="i-mdi-asterisk"
                      class="h-2 w-2 align-middle bg-wb-light-gray-200"
                    />
                    <span class="text-xs text-wb-light-gray-200">Member-only price, valid in app only</span>
                  </p>
                  <p v-if="room?.pricing_data?.wisata_point > 0" class="flex justify-end items-center gap-1">
                    <UIcon
                      name="i-heroicons-star-16-solid"
                      class="h-3 w-3 bg-sky-600"
                    />
                    <span class="text-xs text-sky-600">Collect {{ room.pricing_data.wisata_point }} points</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UModal
        v-model="isModalOpen"
        :ui="{
          container: 'w-full',
          width: 'sm:max-w-[900px]',
          background: '',
          shadow: '',
          overlay: {
            background: 'bg-wb-black-100',
          }
        }"
      >
        <div class="grid room-details-grid--horizontal rounded-lg bg-white overflow-hidden max-h-[400px]">
          <div class="flex items-center h-full bg-black relative" style="grid-area: carousel;">
            <div class="flex flex-col w-full relative">
              <div class="flex h-0 relative pb-[75%] overflow-hidden">
                <img
                  :src="imageValue?.links['1000px']?.href || imageDefault"
                  :alt="imageValue?.caption || 'Image is not available'"
                  class="absolute w-full h-full object-cover"
                  @error="(e: any) => {
                    e.target.src = imageDefault;
                    e.target.alt = 'Image is not available';
                  }"
                />
              </div>
              <div class="absolute top-middle left-0 mx-5 w-9 h-9 flex bg-[#0000004d] items-center justify-center rounded-full cursor-pointer hover:bg-[#00000033]">
                <UIcon name="i-mdi-chevron-left" class="bg-white w-9 h-9" @click="prevImage" />
              </div>
              <div class="absolute top-middle right-0 mx-5 w-9 h-9 flex bg-[#0000004d] items-center justify-center rounded-full cursor-pointer hover:bg-[#00000033]">
                <UIcon name="i-mdi-chevron-right" class="bg-white w-9 h-9" @click="nextImage" />
              </div>
            </div>
            <div class="absolute rounded-lg px-2 py-1 bottom-[2%] right-[2%] bg-[#1e1e1e]">
              <span class="text-white text-sm">{{ idxImage + 1 }} / {{ imagesLen }}</span>
            </div>
          </div>
          <div class="flex items-center px-6 justify-start sticky top-0 z-[5] p-3 relative border border-b" style="grid-area: title;">
            <p class="text-lg font-medium">Room Details</p>
            <UButton
              icon="i-mdi-close"
              color="blue"
              variant="ghost"
              class="absolute right-2 mr-3"
              :ui="{
                rounded: 'rounded-full',
              }"
              @click="isModalOpen = false"
            />
          </div>
          <div class="px-6 py-3" style="grid-area: content;">
            <div class="text-md font-medium">{{ offerDetail?.room_name }}</div>
            <div class="inline-flex flex-wrap gap-2">
              <span class="flex items-center gap-1">
                <UIcon
                  name="i-mdi-bed-king-outline"
                  class="w-[18px] h-[18px] bg-wb-light-gray-100"
                />
                <span>{{ offerDetail?.room_bed_groups }}</span>
              </span>
              <span class="flex items-center gap-1">
                <UIcon
                  name="i-mdi-arrow-expand-vertical"
                  class="w-[18px] h-[18px] bg-wb-light-gray-100"
                />
                <span>{{ offerDetail?.room_size_sqm }} m<sup>2</sup></span>
              </span>
            </div>
            <div class="mt-4 mb-2 text-md font-medium">Room Amenities</div>
            <div class="flex flex-col gap-[10px]">
              <template v-for="group in amenity.groupAmenity">
                <div 
                  v-if="group.amenities"
                >
                  <span class="flex items-center gap-1 mb-1">
                    <WBIcon
                      :path="group.icon"
                      :size="18"
                      custom-class="fill-wb-light-gray-100"
                    />
                    <span>{{ group.title }}</span>
                  </span>
                  <ul class="list-disc list-inside ml-2">
                    <li v-for="amenity in group.amenities" class="text-sm text-[#00000099]">{{ amenity.name }}</li>
                  </ul>
                </div>
              </template>
            </div>
          </div>
        </div>
      </UModal>
    </div>
  </div>
</template>

<style scoped>
[style*="grid-area: content"] {
  overflow-y: auto;
  max-height: 100%
}
</style>