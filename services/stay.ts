export const getStayAvailabilityApi = async (
  propertyId: string,
  queryParams: any,
): Promise<StayAvailabilityResponse | null> => {
  const baseUrl = useRuntimeConfig().public.restApiBase

  const result = await useFetch<StayAvailabilityResponse>(`stay/availability/${propertyId}`, {
    method: 'GET',
    baseURL: baseUrl,
    query: {
      checkin: queryParams.checkin,
      checkout: queryParams.checkout,
      guest_per_room: queryParams.guest_per_room,
      number_of_room: queryParams.number_of_room,
    },
  })

  return result.data.value ?? null
}