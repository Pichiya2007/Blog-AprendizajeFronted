import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPostsByPractica as getPostsByPracticaRequest } from '../../services';

export const usePostsByPractica = () => {

    const [posts, setPosts] = useState(null)

    const getPostsByPractica = async () => {

        const postsData = await getPostsByPracticaRequest();

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
        getPostsByPractica,
        isFetching: !Boolean(posts),
        allPosts: posts?.posts
    }

}