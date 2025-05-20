import { DashboardPage } from './pages/dashboard'
import { PostsPage } from './pages/posts'
import { CommentsPage } from './pages/comments'

const routes = [
    { path: '/*', element: <DashboardPage /> },
    { path: '/posts/course/:id', element: <PostsPage tipo="course" /> },
    { path: '/comments/:id', element: <CommentsPage/> },
]

export default routes