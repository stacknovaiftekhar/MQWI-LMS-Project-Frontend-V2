import { API } from "../utilities/config";
import axios from "axios";

// const API = 'http://127.0.0.1:8000/api';
// const API = import.meta.env.VITE_API_URL;

// const signin = (payload) => axios.post( `${API}/users/login`, payload,
//         { headers: { "Content-Type": "application/json" } }
//     );

const signin = (payload) => axios.post( `${API}/users/login`, payload);
const signup = (payload) => axios.post(`${API}/users/register`, payload);

const resetRequest = (payload) => axios.post(`${API}/users/reset-request`, payload);
const resetConfirm = (uid, token, payload) => axios.post(`${API}/users/reset-confirm/${uid}/${token}`, payload);

export { signin, signup, resetRequest, resetConfirm };