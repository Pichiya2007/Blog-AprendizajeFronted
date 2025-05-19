import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCourses as getCoursesRequest } from '../../services/api.jsx';

export const useCourses = () => {

    const [courses, setCourses] = useState(null)

    const getCourses = async () => {

        const coursesData = await getCoursesRequest();

        if (coursesData.error){
            return toast.error(
                coursesData.e?.response?.data || 'Error getting courses'
            )
        }

        setCourses({
            courses: coursesData.data.courses
        })

    }

    return {
        getCourses,
        isFetching: !Boolean(courses),
        allCourses: courses?.courses
    }

}