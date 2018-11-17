import React from 'react'
import renderer from 'react-test-renderer'
import TimerDeleteButton from './TimerDeleteButton'

describe('TimerDeleteButton', () => {
  let props

  beforeEach(() => {
    props = {
      active: false,
      complete: false,
      superTimerActive: false,
      deleteTimer: () => null,
      id: 'test',
    }
  })

  describe('render', () => {
    it('renders default state', () => {
      const component = renderer.create(
        <TimerDeleteButton {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders active state', () => {
      props.active = true

      const component = renderer.create(
        <TimerDeleteButton {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders complete state', () => {
      props.complete = true

      const component = renderer.create(
        <TimerDeleteButton {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders superTimerActive state', () => {
      props.superTimerActive = true

      const component = renderer.create(
        <TimerDeleteButton {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
