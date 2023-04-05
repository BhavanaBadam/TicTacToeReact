import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from "./home";
import Posts from "./posts";
import Post from "./post";
import NewPost from "./newPost";

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
    },
    {
        path: "/post/new",
        element: <NewPost />
    }
]);

const Root = () => {
    return <RouterProvider router={router} />;
}

export default Root
