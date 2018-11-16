import React from 'react'
import renderer from 'react-test-renderer'
import Shell from './Shell'

describe('Shell', () => {
  it('renders', () => {
    const component = renderer.create(
      <Shell />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
