import { Navbar } from '../../components/dashboard/Navbar.jsx';
import { CommentCard } from '../../components/comments/CommentCard.jsx';
import { Footer } from '../../components/dashboard/Footer.jsx';
import { useParams } from 'react-router-dom';

export const CommentsPage = () => {

    const { id } = useParams();

  return (
    <>
        <Navbar />
        <CommentCard postId={id}/>
        <Footer />
    </>
  )
}
