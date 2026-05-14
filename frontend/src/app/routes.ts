import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import Dashboard from "./components/Dashboard";
import ExamMode from "./components/ExamMode";
import Lectures from "./components/Lectures";
import LectureVideoPlayer from "./components/LectureVideoPlayer";
import LectureVideos from "./components/LectureVideos";
import ChooseExam from "./components/ChooseExam";
import Study from "./components/Study";
import Graph from "./components/Graph";
import BusinessProjects from "./components/BusinessProjects";
import VolunteerProjects from "./components/VolunteerProjects";
import SocialActivities from "./components/SocialActivities";
import JoinTeam from "./components/JoinTeam";
import CareerSupport from "./components/CareerSupport";
import PlacementEvents from "./components/PlacementEvents";
import PortalPlaceholder from "./components/PortalPlaceholder";

function placeholderRoute(title: string, badge: string, description: string) {
  return () =>
    createElement(PortalPlaceholder, {
      title,
      badge,
      description,
    });
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/exam-mode",
    Component: ExamMode,
  },
  {
    path: "/lectures",
    Component: Lectures,
  },
  {
    path: "/lectures/:lectureId",
    Component: LectureVideos,
  },
  {
    path: "/lectures/:lectureId/videos/:videoId",
    Component: LectureVideoPlayer,
  },
  {
    path: "/choose-level/:examId",
    Component: ChooseExam,
  },
  {
    path: "/study/:level/:examId",
    Component: Study,
  },
  {
    path: "/graph/:level/:examId",
    Component: Graph,
  },
  {
    path: "/business-projects",
    Component: BusinessProjects,
  },
  {
    path: "/volunteer-projects",
    Component: VolunteerProjects,
  },
  {
    path: "/social-activities",
    Component: SocialActivities,
  },
  {
    path: "/join-team",
    Component: JoinTeam,
  },
  {
    path: "/career-support",
    Component: CareerSupport,
  },
  {
    path: "/placement-events",
    Component: PlacementEvents,
  },
  {
    path: "/signin",
    Component: placeholderRoute(
      "Sign In",
      "Authentication",
      "This route now works so the dashboard matches the intended Figma navigation flow.",
    ),
  },
  {
    path: "/signup",
    Component: placeholderRoute(
      "Sign Up",
      "Authentication",
      "This page is ready to be replaced with the final Figma sign-up design when you want to move past the main screen.",
    ),
  },
  {
    path: "/student-chat",
    Component: placeholderRoute(
      "Student Chat",
      "Quick Access",
      "The dashboard shortcut now lands on a styled page instead of breaking the route.",
    ),
  },
  {
    path: "/moodle",
    Component: placeholderRoute(
      "Moodle",
      "Quick Access",
      "This is a connected placeholder for the Figma dashboard shortcut.",
    ),
  },
  {
    path: "/outlook",
    Component: placeholderRoute(
      "Outlook",
      "Quick Access",
      "This keeps the original dashboard navigation usable while we focus on visual accuracy.",
    ),
  },
  {
    path: "/timetable",
    Component: placeholderRoute(
      "Timetable",
      "Quick Access",
      "This route is now connected and styled to match the current Figma-inspired frontend.",
    ),
  },
  {
    path: "*",
    Component: Dashboard,
  },
]);
