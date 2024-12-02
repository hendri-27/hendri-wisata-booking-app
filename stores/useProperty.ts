export const useProperty = defineStore('propertyStore', {
  state: () => ({
    propertyContent: null as PropertyContentModel | null,
  }),
  actions: {
    async getPropertyContent(propertyId: string) {
      const res = await getPropertyContentApi(propertyId)
      this.propertyContent = res[propertyId]
    }
  }
})