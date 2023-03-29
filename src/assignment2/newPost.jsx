import {useState} from "react";

const NewPost = () => {
    const [postName, setPostName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [uploadImage, setUploadImage] = useState(true);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
      
        const formData = new FormData();
        formData.append("postName", postName)
        formData.append("image", selectedFile);

        setMsg("Uploading..!");
        fetch('/posts')
          .then(response => response.json())
          .then(data => {
            console.log(data.posts);
            data.posts.map(element => {
              if (element === postName) {
                setMsg("Duplicate File Name");
                setUploadImage(false);
                console.log("i'm Here");
                throw new Error('HTTP error! status: 409')
              }
            });
          })
          .catch(error => console.error('Error while fetching data:', error));

        console.log(uploadImage + "1");
        
        if(uploadImage) {
          fetch("/post/new", {
            method: "POST",
            body: formData
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            } 
            setMsg("Uploaded");
          })
          .then(data => {
            console.log('Upload successful!', data);
          })
          .catch(error => {
            console.error('Error while uploading file:', error);
          })
        }
    };
    return <div>
    <form onSubmit={handleSubmit}>
	    <div> PostName: <input value={postName} onChange={e => setPostName(e.target.value)} /></div>
        <div> UploadPost: <input type="file" name="file" onChange={handleFileChange} /></div>
        <button type="submit">Submit</button> 
        <h3>{msg}</h3>
    </form>
	</div>;
}

export default NewPost;