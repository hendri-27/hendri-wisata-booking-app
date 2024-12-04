<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const property = useProperty()

const { slug } = route.params
const query = route.query
const arg = Array.isArray(slug) ? slug[0] : slug
const id = arg.substring(arg.lastIndexOf('-') + 1)

const items = [
  {
    key: 'deals',
    label: 'DEALS',
    icon: 'i-mdi-tag-outline',
    route: 'stay-slug',
  },
  {
    key: 'photos',
    label: 'PHOTOS',
    icon: 'i-mdi-grid',
    route: 'stay-slug-photos',
  },
  {
    key: 'info',
    label: 'INFO',
    icon: 'i-mdi-information-slab-circle-outline',
    route: 'stay-slug-info',
  }
]

const initialTab = route.name ? String(route.name).split('-').pop() : 'deals'
const initialIndex = items.findIndex(item => item.key === initialTab) 

const currentPosition = ref(initialIndex === -1 ? 0 : initialIndex)
const isFirstRender = ref(true)
const previousPosition = ref(currentPosition.value)

onMounted(async () => {
  await property.getPropertyContent(id)

  nextTick(() => {
    isFirstRender.value = false
  })
})

const customUITabs = computed(() => ({
  wrapper: '',
  container: '',
  list: {
      width: '',
      padding: '',
      rounded: '',
      background: '',
      marker: {
        wrapper: `absolute top-0 left-0 ${isFirstRender.value ? 'duration-0' : 'duration-200'}`,
        base: 'h-[2px] w-full',
        background: 'bg-wb-blue',
        shadow: '',
        rounded: '',
      },
      tab: {
        background: '',
        active: 'text-wb-blue',
        height: 'h-10',
        padding: 'px-2',
        rounded: '',
        shadow: '',
      }
  }
}))

const selected = computed({
  get() {
    return currentPosition.value
  },
  set(value) {
    previousPosition.value = currentPosition.value
    currentPosition.value = value
    router.replace({
      name: `${items[value].route}`,
      params: { arg },
      query
    });
  }
})

const transitionClasses = computed(() => {
  const isForward = currentPosition.value > previousPosition.value
  return {
    enterActiveClass: 'transition-all duration-300 ease-out',
    leaveActiveClass: 'transition-all duration-300 ease-in',
    enterFromClass: `transform ${isForward ? 'translate-x-2/4' : '-translate-x-2/4'} opacity-0`,
    enterToClass: 'transform translate-x-0 opacity-100',
    leaveFromClass: 'transform translate-x-0 opacity-100',
    leaveToClass: `transform ${isForward ? '-translate-x-2/4' : 'translate-x-2/4'} opacity-0`
  }
})
</script>

<template>
  <div>
    <WBNavbar />
    <div class="container m-auto pb-14">
      <WBHeader />
      <div class="flex justify-center border-t border-gray">
        <UTabs
          v-model="selected"
          :ui="customUITabs"
          :items="items"
        />
      </div>
      <div class="w-full h-full relative">
        <Transition
          v-bind="transitionClasses"
          mode="out-in"
        >
          <NuxtPage
            class="w-full mt-8"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.container {
  @media (min-width: 984px) {
    max-width: 1032px;
  }
}
</style>