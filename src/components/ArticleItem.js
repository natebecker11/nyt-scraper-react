import React from 'react'


const ArticleItem = (props) => {
  return (
    <div>
      <a target='_blank' href={props.link}><h3>{props.title}</h3></a>
      <p>By: {props.author}</p>
    </div>

  )
}


export default ArticleItem