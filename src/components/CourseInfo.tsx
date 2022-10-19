import { Course } from "../types/courses";

type CourseInfoProps = {
  course: Course;
};

function CourseInfo(props: CourseInfoProps) {
  const { course } = props;
  return (
    <p className="prose flex flex-col space-y-2">
      <span>
        <b>Name</b>: {course.title}
      </span>

      <span>
        <b>Duration</b>: {course.description}
      </span>
      <span>
        <b>Modules</b>: {course.modules.length}
      </span>
      <span>
        <b>Live class</b>:{" "}
        {course.liveLink ? (
          <a
            className="link link-primary"
            target={"_blank"}
            href={course.liveLink}
            rel="noreferrer"
          >
            {course.liveLink}
          </a>
        ) : (
          "NA"
        )}
      </span>
    </p>
  );
}
export default CourseInfo;
