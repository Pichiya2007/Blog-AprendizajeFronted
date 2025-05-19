import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPostsByTecnologia as getPostsByTecnologiaRequest } from '../../services';

export const usePostsByTecnologia = () => {

    const [posts, setPosts] = useState(null)

    const getPostsByTecnologia = async () => {

        const postsData = await getPostsByTecnologiaRequest();

        if (postsData.error){
            return toast.error(
                postsData.e?.response?.data || 'Error getting posts'
            )
        }

        setPosts({
            posts: postsData.data.posts
        })

    }

    return {
        getPostsByTecnologia,
        isFetching: !Boolean(posts),
        allPosts: posts?.posts
    }

}