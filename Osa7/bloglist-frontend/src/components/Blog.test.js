import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe('<Blog />', () => {
  let blogComponent
  const blog = {
    title: 'test',
    author: 'testauthor',
    url: 'testauthor.com',
    likes: 0
  }

  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} />)
  })

  it('at start the title and author are displayed', () => {
    const nameDiv = blogComponent.find('.namepanel')

    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)
    expect(nameDiv.text()).not.toContain(blog.url)
  })

  it('after clicking the title, children are displayed', () => {
    const nameDiv = blogComponent.find('.namepanel')
    nameDiv.simulate('click')

    const urlDiv = blogComponent.find('.url')
    const likesDiv = blogComponent.find('.likes')

    expect(urlDiv.text()).toContain(blog.url)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})
