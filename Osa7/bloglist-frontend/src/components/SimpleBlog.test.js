import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: "testaus on 'kivaa'",
    author: 'testermaster',
    likes: 0
  }

  it('renders content', () => {
    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={console.log('')} />
    )
    const infoDiv = blogComponent.find('.info')
    const likesDiv = blogComponent.find('.likes')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
  it('calls event handler twice when clicking the button twice', () => {
    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
