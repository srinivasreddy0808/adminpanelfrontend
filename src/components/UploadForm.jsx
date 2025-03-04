import { useState, useRef } from "react";
import styles from "./UploadForm.module.css";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null); // Add a ref

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("message", message);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading file");
      }

      const data = await response.json();
      setImage(null);
      setName("");
      setMessage("");
      fileInputRef.current.value = null;

      console.log(data);
      alert("File uploaded successfully");
    } catch (error) {
      console.log(error);
      alert("Error uploading file");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter notification message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
