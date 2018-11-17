import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Button from '@material-ui/core/Button/Button'
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

    it('renders duration state', () => {
      props.superTimer.duration = '00:00:01'

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

  describe('behaviour', () => {
    it('handles valid Button onClick', () => {
      props.startSuperTimer = jest.fn()
      props.superTimer.duration = '00:00:01'
      props.superTimer.durationInSeconds = 1

      const wrapper = shallow(<SuperTimer {...props} />)
      const button = wrapper.find(Button)

      button.prop('onClick')()

      expect(props.startSuperTimer).toHaveBeenCalled()
    })

    it('handles invalid Button onClick', () => {
      props.startSuperTimer = jest.fn()

      const wrapper = shallow(<SuperTimer {...props} />)
      const button = wrapper.find(Button)

      button.prop('onClick')()

      expect(props.startSuperTimer).not.toHaveBeenCalled()
    })
  })
})
