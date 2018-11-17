import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const { error } = console

console.error = function (message) {
  error.apply(console, arguments) // keep default behaviour
  throw (message instanceof Error ? message : new Error(message))
}

Enzyme.configure({ adapter: new Adapter() })
