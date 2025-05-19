import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCommentsByPost as getCommentsByPostRequest } from '../../services';

export const useCommentsByPost = () => {

    const [comments, setComments] = useState()

    const getCommentsByPost = async (id) => {

        const commentsData = await getCommentsByPostRequest(id);

        if (commentsData.error){
            return toast.error(
                commentsData.e?.response?.data || 'Error getting comments'
            )
        }
        setComments(commentsData)

    }

    return {
        getCommentsByPost,
        isFetching: !Boolean(comments),
        allComments: comments?.comments
    }

}