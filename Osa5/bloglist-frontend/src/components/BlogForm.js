import React from 'react'
const BlogCreationForm = ({ submitMethod }) => {
  return (
    <div>
      <form id="blogCreationForm" onSubmit={submitMethod}>
        <div>
          title
          <input name="title" />
        </div>
        <div>
          author
          <input name="author" />
        </div>
        <div>
          url
          <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogCreationForm
