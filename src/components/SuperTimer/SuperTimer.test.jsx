import React from 'react'
import renderer from 'react-test-renderer'
import SuperTimer from './SuperTimer'

describe('SuperTimer', () => {
  const props = {
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

  it('renders', () => {
    const component = renderer.create(
      <SuperTimer {...props} />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
