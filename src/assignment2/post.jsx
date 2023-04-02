import {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
const Buffer = require('buffer').Buffer;

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

const useComments = (postName) => {
	const [existingComment, setExistingComment] = useState("");
	useEffect(() => {
		const comments = async(postName) => {
			const resp = await fetch(`/post/${postName}/comments`);
			const json = await resp.json();
			const bufferArray = Buffer.from(json.postComments.data);
			const lines = bufferArray.toString('utf8').split('\n');
			console.log(lines);
			setExistingComment(lines);
		}
		comments(postName);
	}, [postName]);
	//console.log("comments after setting: " + existingComment);
	return existingComment;
}

const handleSubmit = async(event,newComment,postName) => {
	event.preventDefault();
	const formData = new FormData();
	formData.append("new_comment", newComment);
	const response = await fetch(`/post/${postName}/comments`, {
	  method: "POST",
	  body: formData
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	} 
	console.log("successfull");
	//return useComments(postName);
};



const Post = () => {
    const {postName} = useParams();
	const {post, isLoading, isError} = usePost(postName);
	const existingComment = useComments(postName);
	const [newComment, setNewComment] = useState("");

	//console.log("imageUrl: " + post);
	//console.log("existingComments: " + existingComment);

    return <>
	       <Link to="/posts">Back</Link>
	       {!!isLoading && <div>Loading...</div>}
	       {!!isError && <div>Something went wrong</div>}
	       {!isLoading && !isError && <ul>
	       <h3>{postName}</h3>
	       <img src={post} />
		   <h3>Comments : </h3>
		   <ul>
	    	{existingComment.map(comment => <li key={comment}>{comment}</li>)}
	    	</ul>
			<form onSubmit={e => handleSubmit(e,newComment,postName)}>
	    		<input value={newComment} placeholder="Comment here..." onChange={e => setNewComment(e.target.value)} />
        		<button type="submit">Submit</button> 
    		</form>
	       </ul>}
	   </>;
}

export default Post;
