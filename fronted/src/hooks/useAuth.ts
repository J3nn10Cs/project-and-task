import { getUser } from "@/services/Auth_api_services";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey : ['profile'],
    queryFn : () => getUser(),
    retry : false,
    //para que no haga un refetch
    refetchOnWindowFocus : false
  })

  return {data, isError, isLoading}
  
}