import { useState } from 'react'
import toast from 'react-hot-toast'
import { getPostsByCourse as getPostsByCourseRequest } from '../../services'

export const usePostsByCourse = () => {
    
    const [data, setData] = useState()

    const getPostsByCourse = async (id) => {

        const res = await getPostsByCourseRequest(id)
        
        if (res.error) {
            return toast.error(
                res.e?.response?.data || 'Error getting posts'
            )
        }
        setData(res.data)

    }

    return {
        getPostsByCourse,
        isFetching: !Boolean(data),
        posts: data?.posts
    }
}