export type Tabs =
  | "Course Info"
  | "Resources"
  | "Assignments"
  | "Projects"
  | "Enrolled";

export interface CourseListItem {
  id: number;
  title: string;
  description: string;
  pictrue: string;
  liveLink?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  pictrue: string;
  liveLink: string;
  modules: Module[];
  projectFiles: string[];
}

export interface Module {
  id: number;
  title: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  title: string;
  videoLink: string;
  resourceFiles: string[];
  assignmentFiles: string[];
}
