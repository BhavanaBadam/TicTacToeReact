import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const usePosts = () => {
    const [posts, setPosts] = useState(null);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
	const getPosts = async() => {
	    try {
		const resp = await fetch("/posts");
		const respJson = await resp.json();
		setPosts(respJson.posts);
	    } catch (err) {
		setIsError(true);
	    }
	}
	getPosts();
    }, []);
    return {posts, isError, isLoading: (!isError && (posts == null))};
}

const Posts = () => {
    const {posts, isLoading, isError} = usePosts();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong</div>;
    return <ul>
	       {posts.map(postName => <li key={postName}><Link to={`/post/${postName}`}>{postName}</Link></li>)}
	       </ul>
}

export default Posts;
