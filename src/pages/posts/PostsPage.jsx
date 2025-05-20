import { Navbar } from '../../components/dashboard/Navbar.jsx'
import { PostsCard } from '../../components/posts/PostsCard.jsx'
import { Footer } from '../../components/dashboard/Footer.jsx'
import { useParams } from 'react-router-dom'

export const PostsPage = ({ tipo }) => {

  const { id } = useParams()

  return (
    <>
      <Navbar />
      <PostsCard tipo={tipo} courseId={id} />
      <Footer />
    </>
  )
}