import React from 'react'
import renderer from 'react-test-renderer'
import SuperTimer from './SuperTimer'

describe('SuperTimer', () => {
  let props

  beforeEach(() => {
    props = {
      superTimer: {
        duration: '00:00:00',
        durationInSeconds: 0,
        active: false,
        currentCount: null,
        timeElapsed: 0,
        complete: false,
      },
      startSuperTimer: () => null,
      tickSuperTimer: () => null,
      completeSuperTimer: () => null,
    }
  })

  describe('render', () => {
    it('renders default state', () => {
      const component = renderer.create(
        <SuperTimer {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders active state', () => {
      props.superTimer.active = true

      const component = renderer.create(
        <SuperTimer {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders complete state', () => {
      props.superTimer.complete = true

      const component = renderer.create(
        <SuperTimer {...props} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
