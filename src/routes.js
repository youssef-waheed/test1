import { createBrowserRouter } from "react-router-dom";
import ApplicationDeadlineUpdate from "./Pages/SystemManagment/ApplicationDeadlineUpdate";

export const routes = createBrowserRouter([
  {
    path: "/AppDeadline",
    children: [
      {
        path: "AppDeadlineUpdate",
        element: <ApplicationDeadlineUpdate />,
      },
    ],
  },
]);
