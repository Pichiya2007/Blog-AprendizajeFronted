import { useState } from "react"
import { addComment as addCommentRequest } from "../../services"

export const useAddComment = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const addComment = async (data) => {

        setIsLoading(true)
        setError(null)

        const res = await addCommentRequest(data)
        setIsLoading(false)
        
        if (res.error) {
        setError(res.e?.response?.data || "Error al agregar comentario")
        return null
        }
        return res.data

    }

    return {
        addComment,
        isLoading,
        error
    }
}