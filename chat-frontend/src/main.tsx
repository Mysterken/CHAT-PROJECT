import "preact/debug";
import {render} from "preact";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Error from "./routes/error.tsx";
import Login from "./routes/login.jsx";
import Register from "./routes/register.jsx";
import Chat from "./routes/chat.tsx";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <Error/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "chat",
    element: <Chat/>,
  }
]);

render(<RouterProvider router={router}/>, document.getElementById("app")!);
