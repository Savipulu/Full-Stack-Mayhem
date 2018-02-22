import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: "testaus on 'kivaa'",
      author: 'testermaster',
      likes: 0
    }

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={console.log('')} />
    )
    const infoDiv = blogComponent.find('.info')
    const likesDiv = blogComponent.find('.likes')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})
