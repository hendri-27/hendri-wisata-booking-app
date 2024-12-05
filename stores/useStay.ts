export const useStay = defineStore("stayStore", {
  state: () => ({
    isLoadingFilter: false,
    isLoading: false,
    filters: [] as String[],
    stayOffers: [] as Array<StayAvailabilityModel>,
    roomOffers: [] as Array<RoomModel>,
  }),
  getters: {
    hasFilter: (state) => {
      return (filter: string) => state.filters.includes(filter)
    },
    isFreeFood: () => {
      // BB = Bed and Breakfast
      // RO = Room Only
      return (code: string) => code === "BB"
    },
    isFreeCancel: () => {
      // FC = Free Cancellation
      // NR = Non Refundable
      return (code: string) => code === "FC"
    }
  },
  actions: {
    async getStayAvailability(propertyId: string, queryParams: any) {
      this.isLoadingFilter = true
      this.isLoading = true
      const res = await getStayAvailabilityApi(propertyId, queryParams)

      this.stayOffers = res?.offer_list ?? []
      this.groupRoomsById()
    },
    
    async groupRoomsById() {
      this.isLoading = true
  
      await new Promise(resolve => setTimeout(resolve, 100))

      this.roomOffers = []
      const roomMap = new Map<string, RoomModel>()

      // Filter stayOffers based on selected filters
      let filteredStayOffers = this.stayOffers
      
      if (this.filters.length > 0) {
        filteredStayOffers = this.stayOffers.filter(offer => {
          const matchesFreeFood = this.hasFilter('BB') ? this.isFreeFood(offer.meal_plan_code) : true
          const matchesFreeCancel = this.hasFilter('FC') ? this.isFreeCancel(offer.cancel_policy_code) : true
          return matchesFreeFood && matchesFreeCancel
        })
      }

      filteredStayOffers.forEach(stayOffer => {
        const roomId = stayOffer.room_data.id;
    
        if (!roomMap.has(roomId)) {
          roomMap.set(roomId, {
            offer_id: stayOffer.offer_id,
            price_total: stayOffer.price_total,
            rate_nightly: stayOffer.rate_nightly,
            room_name: stayOffer.room_name,
            room_available: stayOffer.room_available,
            room_bed_groups: stayOffer.room_bed_groups,
            room_size_sqm: stayOffer.room_size_sqm,
            room_images: stayOffer.room_images,
            grouped_rooms: [],
          })
        }
    
        roomMap.get(roomId)?.grouped_rooms.push(stayOffer)
      });

      // Convert to array and sort by lowest price in each group
      this.roomOffers = Array.from(roomMap.values())
      .sort((a, b) => {
        const lowestPriceA = Math.min(...a.grouped_rooms.map(room => room.price_total))
        const lowestPriceB = Math.min(...b.grouped_rooms.map(room => room.price_total))
        return lowestPriceA - lowestPriceB
      })

      this.isLoading = false
      this.isLoadingFilter = false
    },

    addFilter(filter: string) {
      if (this.filters.includes(filter)) {
        this.filters.splice(this.filters.indexOf(filter), 1)
      } else {
        this.filters.push(filter)
      }
      this.groupRoomsById()
    },
    clearAllFilter() {
      this.filters = []
      this.groupRoomsById()
    }
  }
})