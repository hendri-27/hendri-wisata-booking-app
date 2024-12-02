export const getPropertyContentApi = async (
  propertyId: String,
): Promise<PropertyContentResponse> => {
  const baseUrl = useRuntimeConfig().public.restApiBase

  const result = await useFetch<PropertyContentResponse>('property/content', {
    method: 'GET',
    baseURL: baseUrl,
    query: {
      id: propertyId,
      include: 'room'
    }
  })

  return result.data.value ?? {}
}