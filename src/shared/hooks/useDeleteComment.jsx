import { useState } from 'react'
import { deleteComment as deleteCommentRequest } from '../../services'

export const useDeleteComment = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteComment = async (id) => {

        setIsLoading(true)
        setError(null)

        const res = await deleteCommentRequest(id)
        setIsLoading(false)
        
        if (res.error) {
        setError(res.e?.response?.data || 'Error deleting comment')
        return null
        }
        return res.data
    }

    return {
        deleteComment,
        isLoading,
        error
    }
}