import api from "./api";

// api.create({
//   baseURL: 'http://api.weatherapi.com/v1'
// })

export const getApiData = async(location:string)=>{
    const response = await api.get('https://api.weatherapi.com/v1/forecast.json',{
        params:{
            q: location,
            aqi : 'yes',
            alerts : 'yes',
            days:10

        }
    });
    console.log(response.data)
    return response.status === 200 ? response.data : [];
}