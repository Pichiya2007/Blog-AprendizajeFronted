import { useState } from 'react'
import { updateComment as updateCommentRequest } from '../../services'

export const useUpdateComment = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateComment = async (id, data) => {

        setIsLoading(true)
        setError(null)

        const res = await updateCommentRequest(id, data)
        setIsLoading(false)

        if (res.error) {
        setError(res.e?.response?.data || 'Error updating comment')
        return null
        }
        return res.data

    }

    return {
        updateComment,
        isLoading,
        error
    }
}