import { MakeGenerics, Route } from "@tanstack/react-location";
import { getAllCourses } from "./hooks/useGetAllCourses";
import { getCourse } from "./hooks/useGetCourse";
import { getCourses } from "./hooks/useGetCourses";
import { queryClient } from "./lib/react-query";
import Admin from "./pages/admin";
import Course from "./pages/course";
import CreateCourse from "./pages/create-course";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ManageCourse from "./pages/ManageCourse";
import ManageCourses from "./pages/ManageCourses";
import Profile from "./pages/Profile";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    // ordersForStudent: ICourse[];
    // courseProgress: ICourseProgress;
  };
  Params: {
    courseId: string;
  };
}>;

export const routes: Route<LocationGenerics>[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "/",
    element: <Dashboard />,
    loader: async () => {
      return (
        queryClient.getQueryData(["getCourses"]) ??
        (await queryClient.fetchQuery(["getCourses"], () => getCourses()))
      );
    },
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "courses",
        element: <ManageCourses />,
        loader: async () => {
          return (
            queryClient.getQueryData(["getAllCourses"]) ??
            (await queryClient.fetchQuery(["getAllCourses"], () =>
              getAllCourses()
            ))
          );
        },
        children: [
          { path: "add", element: <CreateCourse /> },
          {
            path: ":courseId",
            element: <ManageCourse />,
            loader: async ({ params }) => {
              return (
                queryClient.getQueryData(["getCourse", params.courseId]) ??
                (await queryClient.fetchQuery(
                  ["getCourse", params.courseId],
                  () => getCourse(params.courseId)
                ))
              );
            },
          },
        ],
      },
    ],
  },
  {
    path: "/:courseId",
    element: <Course />,
    loader: async ({ params }) => {
      return (
        queryClient.getQueryData(["getCourse", params.courseId]) ??
        (await queryClient.fetchQuery(["getCourse", params.courseId], () =>
          getCourse(params.courseId)
        ))
      );
    },
  },
];
