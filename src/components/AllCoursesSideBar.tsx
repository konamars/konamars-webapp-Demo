import { Link } from "@tanstack/react-location";
import useGetAllCourses from "../hooks/useGetAllCourses";

function AllCoursesSideBar() {
  const courses = useGetAllCourses();

  if (!courses.data) {
    return null;
  }

  return (
    <div>
      <div className="flex h-12 items-center border-b">
        <input
          className="h-full w-full px-4 focus:border-primary-focus"
          placeholder="🔎  Search courses"
        />
      </div>
      {courses.data.map((course) => (
        <div key={course.id} className="flex h-12 items-center border-b px-4">
          <Link to={course.id}>{course.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default AllCoursesSideBar;
