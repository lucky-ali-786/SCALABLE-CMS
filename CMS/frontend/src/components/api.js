import axios from 'axios';
const api=axios.create({
    baseURL:'http://localhost:8000',
});
export const googleAuth=(code)=>{
    return api.get(`/users/api/v1/google?code=${code}`, {
      withCredentials: true,
    });
}