import {Link} from "react-router-dom";

const Home = () => {
    return <div>
        <h2>Welcome!</h2>
               What do you want to do today?
	       <ul>
		   <li><Link to="posts">View posts</Link></li>
		   <li><Link to="post/new">New post</Link></li>
		   </ul>
    </div>;
}

export default Home;
