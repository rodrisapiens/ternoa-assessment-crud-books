import styles from "../styles/bookCard.module.scss"
import Image from "next/image";
function BookCard({title,description,image,id,dispatch}) {
    async function handleDelete(){
        const response= await fetch(`/api/book/${id}`,{
          "method":"DELETE",
        })
        dispatch({action:"delete",payload:{id}})  
      }
      function handleEdit(){
          console.log("hola")
      }
  return (
    <div className={styles.card}>
        <div className={styles.rigth}>
        <Image 
        src={image}
        layout="fill"/>
        </div>
        <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
        <button onClick={handleEdit} className={styles.button}>Edit</button>
        <button onClick={handleDelete} className={styles.button}>Delete</button>
        </div>
        </div>
    </div>
  )
}

export default BookCard