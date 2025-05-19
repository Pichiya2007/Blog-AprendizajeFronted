import { Navbar } from '../../components/dashboard/Navbar.jsx';
import { CourseCard } from '../../components/courses/CourseCard.jsx';
import { Footer } from '../../components/dashboard/Footer.jsx';

export const DashboardPage = () => {
  return (
    <>
        <Navbar />
        <CourseCard />
        <Footer />
    </>
  )
}
