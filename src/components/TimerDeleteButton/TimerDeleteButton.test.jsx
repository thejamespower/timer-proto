import React from 'react'
import renderer from 'react-test-renderer'
import TimerDeleteButton from './TimerDeleteButton'

describe('TimerDeleteButton', () => {
  const props = {
    active: false,
    complete: false,
    superTimerActive: false,
    deleteTimer: () => null,
    id: 'test',
  }

  it('renders', () => {
    const component = renderer.create(
      <TimerDeleteButton {...props} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
