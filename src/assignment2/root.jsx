import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from "./home";
import Posts from "./posts";
import Post from "./post";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/posts",
        element: <Posts />,
    },
    {
        path: "/post/:postName",
        element: <Post />,
    }
]);

const Root = () => {
    return <RouterProvider router={router} />;
}

export default Root
