import AddBookCard from '../components/AddBookCard'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import BookCard from '../components/BookCard'
import { useEffect, useReducer } from 'react'
function reducer(listBooks, action) {
  switch (action.type) {
    case "charge":
      return [...action.payload.list]
    case "add":
      return [action.payload.data, ...listBooks]
    case "delete":
      return listBooks.filter((element) => {
        return element._id !== action.payload.id;
      })
    case "upDate":
      return listBooks.map((element) => {
        if(element._id===action.payload.id){
          console.log("lo que llega: ","id: ",action.payload.id, "title: ",action.payload.title, "description: ",action.payload.description,"image: ",action.payload.image)
          element.title=action.payload.title;
          element.description=action.payload.description;
          element.image=action.payload.image;
        }
        return element;
      })
  }
}
export default function Home({ list }) {
  const [listBooks, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    dispatch({ type: "charge", payload: { list } })
  }, [])

  return (
    <div className={styles.Home}>
      <div className={styles.addSection}>
        <AddBookCard dispatch={dispatch} />
      </div>
      <div className={styles.dashBoard}>
        {listBooks?.map((element) => {
          return <BookCard key={element?._id} title={element?.title} description={element?.description} image={element?.image} id={element?._id} dispatch={dispatch} />
        })}
      </div>
    </div>
  )
}
export async function getServerSideProps() {
  const response = await fetch("https://ternoa-assessment-crud-books.vercel.app/api/books");
  const data = await response.json();
  return {
    props: {
      list: data.books
    }
  }
}
