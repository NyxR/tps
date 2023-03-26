import axios from "axios"
import { BaseURL } from "../urls/todos_urls"

// create new axios instance
export default axios.create({
    baseURL: BaseURL,
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': '*',
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
})