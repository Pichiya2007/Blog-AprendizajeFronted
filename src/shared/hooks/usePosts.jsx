import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPosts as getPostsRequest } from '../../services/api.jsx';

export const usePosts = () => {

    const [posts, setPosts] = useState(null)

    const getPosts = async () => {

        const postsData = await getPostsRequest();

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
        getPosts,
        isFetching: !Boolean(posts),
        allPosts: posts?.posts
    }

}