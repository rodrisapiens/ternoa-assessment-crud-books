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
      return [...listBooks, action.payload.data]
      case "delete":
        return listBooks.filter((element)=>{
          console.log(action.payload.id,":action.payload.id.",element._id,":element._id")
          return element._id!=action.payload.id
        })
  }
}
export default function Home({ list }) {
  const [listBooks, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    dispatch({type:"charge",payload:{list}})
  }, [])

  return (
    <div className={styles.Home}>
      <AddBookCard dispatch={dispatch}/>
      <div className={styles.dashBoard}>
      {listBooks?.map((element) => {
        return <BookCard key={element._id} title={element.title} description={element.description} image={element.image} id={element._id} dispatch={dispatch}/>
      })}
      </div>
    </div>
  )
}
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/books");
  const data = await response.json();
  return {
    props: {
      list: data.books
    }
  }
}
