import React from 'react'
import renderer from 'react-test-renderer'
import Timer from './Timer'

describe('Timer', () => {
  const props = {
    timer: {
      id: '',
      duration: '',
      name: '',
      active: false,
      timeToStart: '',
      timeToStartInSeconds: 0,
      complete: false,
    },
    deleteTimer: () => null,
    completeTimer: () => null,
    superTimerActive: false,
  }

  it('renders', () => {
    const component = renderer.create(
      <Timer {...props} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
