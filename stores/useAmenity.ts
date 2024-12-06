export const useAmenity = defineStore("amenityStore", {
  state: () => ({
    groupAmenity: [] as Array<GroupAmenityModel>
  }),
  actions: {
    groupByCategory(amenities: { [id: string]: RoomAmenitiesResponse }) {
      const categories = useAmenityCategories() as { [id: string]: string }
      const icons = useAmenityIcons() as { [id: string]: string }
      const titles = useAmenityTitle() as { [id: string]: string }
      
      // Create a map to group amenities by category
      const groupedMap = new Map<string, GroupAmenityModel>()

      Object.values(amenities).forEach(amenity => {
        const categoryId = categories[amenity.id]
        
        if (!categoryId) return // Skip if no category mapping found

        if (!groupedMap.has(categoryId)) {
          // Initialize new category group
          groupedMap.set(categoryId, {
            title: titles[categoryId] || '',
            icon: icons[categoryId] || '',
            amenities: {},
            category: categoryId
          })
        }

        // Add amenity to its category group
        const group = groupedMap.get(categoryId)!
        group.amenities[amenity.id] = {
          id: amenity.id,
          name: amenity.name,
          value: amenity.value
        }
      })

      const categoryOrder = ['bedroom', 'bathroom', 'entertainment', 'food_and_drink', 'internet', 'more']

      // Update the state with grouped amenities
      this.groupAmenity = Array.from(groupedMap.values()).sort((a, b) => 
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      )
    }
  }
})