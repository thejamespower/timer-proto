import React from 'react'
import renderer from 'react-test-renderer'
import TimerCreator from './TimerCreator'

jest.mock('../TimeField', () => 'TimeField')

describe('TimerCreator', () => {
  const props = {
    createTimer: () => null,
    name: '',
  }

  it('renders', () => {
    const component = renderer.create(
      <TimerCreator {...props} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
