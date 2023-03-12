import {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';

const usePost = (postName) => {
    const [post, setPost] = useState(null);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
	setPost(null);
	setIsError(false);
	const getPost = async(postName) => {
	    try {
		const resp = await fetch(`/post/${postName}`);
		const blob = await resp.blob();
		console.log(blob);
		const imgUrl = URL.createObjectURL(blob);
		console.log(imgUrl);
		setPost(imgUrl);
	    } catch (err) {
		setIsError(true);
	    }
	}
	getPost(postName);
    }, [postName]);
    return {post, isError, isLoading: (!isError && (post == null))};
}

const Post = () => {
    const {postName} = useParams();
    const {post, isLoading, isError} = usePost(postName);
    return <>
	       <Link to="/posts">Back</Link>
	       {!!isLoading && <div>Loading...</div>}
	       {!!isError && <div>Something went wrong</div>}
	       {!isLoading && !isError && <ul>
	       <h3>{postName}</h3>
	       <img src={post} />
	       </ul>}
	   </>;
}

export default Post;
