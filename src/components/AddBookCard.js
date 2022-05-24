import styles from "../styles/addBookCard.module.scss"
import Plus from "../images/plus-svgrepo-com.svg"
import Image from 'next/image'
import { useState, useEffect, useRef } from "react"
function AddBookCard({ dispatch }) {
    const [image, setImage] = useState()
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [preview, setPreview] = useState()
    const fileInputRef = useRef();
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null)
        }
    }, [image])
    function handleImageInput(event) {
        const file = event.currentTarget.files[0];
        if (file) {
            setImage(file);
            console.log("hols")
        }
        else {
            setImage(null);
        }
    }
    function handleImgClick(e) {
        fileInputRef.current.click();
    }
    async function handleSend() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        console.log("title", title);
        if (title !== "" && description !== "" && preview) {
            const response = await fetch("/api/books", {
                method: "POST",
                body: JSON.stringify({ "title": title, "description": description, "image": preview }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data);
            dispatch({ type: "add", payload: { data } })
            setTitle("");
            setDescription("");
            setImage(null);
        }
        else {
            alert("All spaces must be filled to send a book")
            return
        }
    }
    return (
        <>
            <div className={styles.card}>
                <div className={styles.left}>
                    {preview ?
                        <Image src={preview} layout="fill" /> :
                        <div className={styles.plusConteiner} onClick={handleImgClick}>
                            <Image src={Plus} className={styles.plus} />
                            <p className="addImage">Add an image</p>
                        </div>}
                </div>
                <div className={styles.rigth}>
                    <input type={"text"} id="title" placeholder={"enter a title"} className={styles.titleInput} value={title} onChange={(e) => { setTitle(e.currentTarget.value) }}></input>
                    <textarea id='description' placeholder='enter a description' className={styles.descriptionInput} value={description} onChange={(e) => { setDescription(e.currentTarget.value) }}></textarea>
                    <button className={styles.send} onClick={handleSend}>Add Book!</button>
                </div>
            </div>
            <input
                accept='image/*'
                type="file"
                id='imageInput'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageInput}></input>
        </>
    )
}

export default AddBookCard