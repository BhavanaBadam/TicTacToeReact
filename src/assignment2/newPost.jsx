import {useState} from "react";

const NewPost = () => {
    const [postName, setPostName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
      
        const formData = new FormData();
        formData.append("postName", postName)
        formData.append("image", selectedFile);
        setUploading(true);
        setSuccess(false);
        fetch("/post/new", {
          method: "POST",
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            setErrorMsg("Duplicate FileName");
            console.log("I am here");
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            setSuccess(true);
          }
        })
        .then(data => {
          console.log('Upload successful!', data);
        })
        .catch(error => {
          console.error('Error while uploading file:', error);
        })
        .finally(() => {
          setUploading(false);
        });
    };

    return <div>
    <form onSubmit={handleSubmit}>
	    <div> PostName: <input value={postName} onChange={e => setPostName(e.target.value)} /></div>
        <div> UploadPost: <input type="file" name="file" onChange={handleFileChange} /></div>
        <button type="submit">Submit</button>
        {uploading && <p>Uploading...</p>}
      {success && <p>Upload successful!</p>}
      {errorMsg}
    </form>
	</div>;
}

export default NewPost;