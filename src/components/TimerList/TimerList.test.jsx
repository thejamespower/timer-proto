import React from 'react'
import renderer from 'react-test-renderer'
import TimerList from './TimerList'

jest.mock('../SuperTimer', () => 'SuperTimer')

describe('TimerList', () => {
  const props = {
    timers: [],
  }

  it('renders', () => {
    const component = renderer.create(
      <TimerList {...props} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
