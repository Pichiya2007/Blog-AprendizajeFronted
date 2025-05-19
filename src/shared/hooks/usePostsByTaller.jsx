import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPostsByTaller as getPostsByTallerRequest } from '../../services';

export const usePostsByTaller = () => {

    const [posts, setPosts] = useState(null)

    const getPostsByTaller = async () => {

        const postsData = await getPostsByTallerRequest();

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
        getPostsByTaller,
        isFetching: !Boolean(posts),
        allPosts: posts?.posts
    }

}