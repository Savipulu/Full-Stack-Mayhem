import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'

const BlogCreationForm = ({ submitMethod }) => {
  return (
    <div>
      <Form id="blogCreationForm" onSubmit={submitMethod}>
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
        <div>
          <br />
          <Button color="green" type="submit">
            create
          </Button>
        </div>
      </Form>
    </div>
  )
}

BlogCreationForm.propTypes = {
  submitMethod: PropTypes.func.isRequired
}

export default BlogCreationForm
