import { useState } from 'react'
import toast from 'react-hot-toast'
import { getCommentsByPost as getCommentsByPostRequest } from '../../services'

export const useCommentsByPost = () => {

  const [data, setData] = useState()

  const getCommentsByPost = async (id) => {

    const res = await getCommentsByPostRequest(id)
    
    if (res.error) {
      return toast.error(
        res.e?.response?.data || 'Error getting comments'
      )
    }
    setData(res.data)

  }

  return {
    getCommentsByPost,
    isFetching: !Boolean(data),
    post: data?.post,
    allComments: data?.comments
  }
}