import React from 'react'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './components/Blog'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })
  /*
  describe('when user is logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
    })

    it('all notes are rendered', () => {
      app.update()
      // ...
    })
  })
  */
})
