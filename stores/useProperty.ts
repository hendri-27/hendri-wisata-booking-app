export const useProperty = defineStore('propertyStore', {
  state: () => ({
    propertyContent: null as PropertyContentModel | null,
  }),
  getters: {
    getGeneralInfo: (state): any | null => {
      return state.propertyContent?.general_info || null
    },
    getImportantInfo: (state): any | null => {
      return state.propertyContent?.important_info || null
    }
  },
  actions: {
    async getPropertyContent(propertyId: string) {
      const res = await getPropertyContentApi(propertyId)
      this.propertyContent = res[propertyId]
    }
  }
})