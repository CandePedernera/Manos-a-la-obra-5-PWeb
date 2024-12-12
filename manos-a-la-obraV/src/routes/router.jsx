import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Main";
import MyProjects from "../components/paginas/MyProjects";
import Story from "../components/paginas/Story";
import Settings from "../components/paginas/Settings";
import MyProjectsDetails from "../components/paginas/MyProjectsDetails";
import EpicDetails from "../components/paginas/EpicDetails";
import StoryDetails from "../components/paginas/StoryDetails";
import Login from "../components/paginas/Login";
import PrivateRoute from "./PrivateRoute";  // Importa el componente de rutas privadas

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Main />
            </PrivateRoute>
        ),
    },
    {
        path: "/home",
        element: (
            <PrivateRoute>
                <Main />
            </PrivateRoute>
        ),
    },
    {
        path: "/my-projects",
        element: (
            <PrivateRoute>
                <MyProjects />
            </PrivateRoute>
        ),
    },
    {
        path: "/projects/:projectId/epics",
        element: (
            <PrivateRoute>
                <MyProjectsDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/epics/:epicId/stories",
        element: (
            <PrivateRoute>
                <EpicDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/my-stories/",
        element: (
            <PrivateRoute>
                <Story />
            </PrivateRoute>
        ),
    },
    {
        path: "/stories/:storyId/tasks",
        element: (
            <PrivateRoute>
                <StoryDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/settings",
        element: (
            <PrivateRoute>
                <Settings />
            </PrivateRoute>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
