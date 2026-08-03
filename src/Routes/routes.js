import { lazy } from "react";
const Home = lazy(() => import("../Components/Home"));
const vihanLanding = lazy(() => import("../Components/LandingPage/Viahaantechlanding"));
const Admin = lazy(() => import("../Components/sections/Admin"));
const userDashboard = lazy(() => import("../Components/sections/User/users-dashboards"));
const userBio = lazy(() => import("../Components/sections/Admin/AdminIntro"));

const User = lazy(() => import("../Components/sections/Admin/jsonApi"));
const Login = lazy(() => import("../Components/sections/Admin/Login"));
const Weather = lazy(() => import("../Components/Weather"));
const PageNotFound = lazy(() => import("../Components/PageNotFound"));
const travelers = lazy(() => import("../Components/Tour-Travels/Vihan"));
const AdminProjects = lazy(() => import("../Components/sections/Admin/AdminProjects"));
const AdminProjectsForm = lazy(() => import("../Components/sections/Admin/Admin_Form/ProjectForm"));
const AdminEducationForm = lazy(() => import("../Components/sections/Admin/Admin_Form/EducationForm"));
const AdminExperienceForm = lazy(() => import("../Components/sections/Admin/Admin_Form/ExperienceForm"));
const AdminAllSkillsForm = lazy(() => import("../Components/sections/Admin/Admin_Form/AllSkillsForm"));

const allRoutes = [
  { path: "/", element: Home },
  { path: "/user/:name", element: Home },
  { path: "/vihaan", element: vihanLanding },
  { path: "/weather", element: Weather },
  { path: "/crud-user", element: User },
  { path: "/dv-travels", element: travelers },
  { path: "/login", element: Login },

  { path: "/admin-dashboard", element: Admin, protected: true },
  { path: "/user-dashboard", element: userDashboard, protected: true },
  { path: "/admin/projects", element: AdminProjects },
  { path: "/admin/user-profile", element: userBio },
  { path: "/admin/project-form", element: AdminProjectsForm },
  { path: "/admin/project-form/:id", element: AdminProjectsForm },
  { path: "/admin/education-form", element: AdminEducationForm },
  { path: "/admin/education-form/:id", element: AdminEducationForm },
  { path: "/admin/experience-form", element: AdminExperienceForm },
  { path: "/admin/experience-form/:id", element: AdminExperienceForm },
  { path: "/admin/all-skills-form", element: AdminAllSkillsForm },
  { path: "/admin/all-skills-form/:id", element: AdminAllSkillsForm },
  { path: "/429", element: PageNotFound },
  { path: "/not-access", element: PageNotFound },
  { path: "*", element: PageNotFound },
];

export default allRoutes;
