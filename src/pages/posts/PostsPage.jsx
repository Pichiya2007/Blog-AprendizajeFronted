import { Navbar } from '../../components/dashboard/Navbar.jsx'
import { PostsCard } from '../../components/posts/PostsCard.jsx'
import { Footer } from '../../components/dashboard/Footer.jsx'

export const PostsPage = ({ tipo }) => {
  return (
    <>
      <Navbar />
      <PostsCard tipo={tipo} />
      <Footer />
    </>
  )
}