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

export const getPostsByCourse = async (courseId) => {
    try {
        return await apiClient.get(`/posts/course/${courseId}`)
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

export const updateComment = async (id, data) => {
    try {
        return await apiClient.put(`/comments/${id}`, data)
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}

export const deleteComment = async (id) => {
    try {
        return await apiClient.delete(`/comments/${id}`)
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
}