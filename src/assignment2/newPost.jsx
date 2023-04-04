import {useState} from "react";
import { Link } from 'react-router-dom';

const NewPost = () => {
    const [postName, setPostName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [msg, setMsg] = useState("");

    /*
    useEffect(() => {
       fetch("/posts")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data.posts);
        })
        .catch((error) => console.error("Error while fetching data:", error));
    }, []);
    */

    //console.log(posts);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async(event) => {

        event.preventDefault();
        setMsg("Uploading..!");    
        const formData = new FormData();
        formData.append("postName", postName)
        formData.append("image", selectedFile);

        const resp = await fetch("/posts");
        const json = await resp.json();
        const posts1 = json.posts;

        posts1.forEach(element => {
          if (element === postName) {
            setMsg("Duplicate File Name");
            console.log("i'm Here");
            throw new Error('HTTP error! status: 409')
          }
        });
        
        const response = await fetch("/post/new", {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
        setMsg("Uploaded Successfully!");
    };
    return <div>
    <p><button ><Link to="/">Back To Home</Link></button></p>
    <form onSubmit={handleSubmit}>
	    <div> PostName: <input value={postName} onChange={e => setPostName(e.target.value)} /></div>
        <div> UploadPost: <input type="file" name="file" accept="image/png, image/jpeg" onChange={handleFileChange} /></div>
        <button type="submit">Submit</button> 
        <h3>{msg}</h3>
    </form>
	</div>;
}

export default NewPost;