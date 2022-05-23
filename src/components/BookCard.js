import styles from "../styles/bookCard.module.scss"
import Image from "next/image";
import Plus from "../images/plus-svgrepo-com.svg"
import { useState, useEffect, useRef } from "react";
function BookCard({ title, description, image, id, dispatch }) {
    const [editOn, setEditOn] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description)
    const [newImage, setNewImage] = useState();
    const [newPreview, setNewPreview] = useState(image);
    const fileInputRef = useRef();
    useEffect(() => {
        if (newImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPreview(reader.result);
            }
            reader.readAsDataURL(newImage);
        } else {
            setNewPreview(image)
        }
    }, [newImage])
    function handleImageInput(event) {
        const file = event.currentTarget.files[0];
        if (file) {
            setNewImage(file);
        }
        else {
            setNewImage(null);
        }
    }
    function handleImgClick(e) {
        fileInputRef.current.click();
    }
    async function handleUpDate() {
        const response = await fetch(`/api/book/${id}`, {
            method: "PUT",
            body: JSON.stringify({ "title": newTitle, "description": newDescription, "image": newPreview }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json();
        dispatch({ type: "upDate", payload: { "id":id, "title": newTitle, "descripion": newDescription, "image":newPreview?newPreview:image } })
    }
    async function handleDelete() {
        dispatch({ type: "delete", payload: { id } })
        const response = await fetch(`/api/book/${id}`, {
            "method": "DELETE"
        })
    }
    function handleEdit() {
        if (editOn) {
            handleUpDate();
        }
        setEditOn(!editOn)
    }
    return (
        <div className={styles.card}>
            <div className={editOn?styles.rigthOn:styles.rigth}>
                <Image
                    src={newPreview?newPreview:image}
                    layout="fill" />
                {editOn && <div className={styles.plusConteiner} onClick={handleImgClick}>
                     <Image src={Plus} className={styles.plus} /> 
                    <p className="addImage">Change the image</p>
                </div>}
            </div>
            <div className={styles.left}>
                {editOn ? <input value={newTitle} onChange={(e) => { setNewTitle(e.currentTarget.value) }} className={styles.input} ></input> : <h1 className={styles.title}>{newTitle?newTitle:title}</h1>}
                {editOn ? <textarea value={newDescription} onChange={(e) => { setNewDescription(e.currentTarget.value) }} className={styles.textarea} ></textarea> : <p className={styles.description}>{newDescription?newDescription:description}</p>}
                <div className={styles.buttons}>
                    <button onClick={handleEdit} className={styles.button}>{editOn ? "Done" : "Edit"}</button>
                    <button onClick={handleDelete} className={styles.button}>Delete</button>
                </div>
            </div>
            <input
                accept='image/*'
                type="file"
                id='imageInput'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageInput}></input>
        </div>
    )
}

export default BookCard