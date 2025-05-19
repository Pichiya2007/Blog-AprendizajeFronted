import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/blog/v1',
    timeout: 5000
})

export const getCourses = async () => {
    try {
        return await apiClient.get('/courses')
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}

export const getPosts = async () => {
    try {
        return await apiClient.get('/posts')
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}