import axios from "axios";

//a donde estamos apuntando
const api = axios.create({
  baseURL : import.meta.env.VITE_API_URL
})

//* Lo usan todos lo que hacen el consumo de la api
//se ejecuta antes de hacer la peticion http - req se envia antes de la peticion http
api.interceptors.request.use(config => { //* No perjudica a los que no lo necesitan
  const token = localStorage.getItem('Auth_Token')
  //si existe el token
  if(token){
    //enviamos la config con headers y inyectamos el token
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api