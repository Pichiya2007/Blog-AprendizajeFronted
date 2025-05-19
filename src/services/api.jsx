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

export const getPostsByTaller = async () => {
    try {
        return await apiClient.get('/posts/Taller')
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}

export const getPostsByPractica = async () => {
    try {
        return await apiClient.get('/posts/Practica')
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}

export const getPostsByTecnologia = async () => {
    try {
        return await apiClient.get('/posts/Tecnologia')
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}

export const getCommentsByPost = async (postId) => {
    try {
        return await apiClient.get(`/comments/${postId}`)
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}

export const addComment = async (data) => {
    try {
        return await apiClient.post('/comments', data)
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}