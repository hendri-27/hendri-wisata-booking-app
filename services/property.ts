export const getPropertyContentApi = async (
  propertyId: String,
): Promise<PropertyContentResponse> => {
  const baseUrl = useRuntimeConfig().public.restApiBase

  const result = await useFetch<PropertyContentResponse>('property/content', {
    method: 'GET',
    baseURL: baseUrl,
    query: {
      id: propertyId,
      language: 'en-us',
      include: ['image', 'room', 'important_info', 'general_info']
    }
  })

  return result.data.value ?? {}
}