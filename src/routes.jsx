import { DashboardPage } from './pages/dashboard'
import { PostsPage } from './pages/posts'
import { CommentsPage } from './pages/comments'

const routes = [
    { path: '/*', element: <DashboardPage /> },
    { path: '/posts/taller', element: <PostsPage tipo="taller" /> },
    { path: '/posts/practica', element: <PostsPage tipo="practica" /> },
    { path: '/posts/tecnologia', element: <PostsPage tipo="tecnologia" /> },
    { path: '/comments/:id', element: <CommentsPage/> },
]

export default routes