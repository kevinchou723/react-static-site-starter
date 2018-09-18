import { Component } from 'react'

class ExampleClass extends Component {
  state = {
    example: 'hello example'
  }

  getChild = () => {
    return <div>this is child</div>
  }

  render() {
    return (
      <div>
        <div>This is example class component</div>
        { this.getChild() }
        { this.state.example }
      </div>
    )
  }
}

export default ExampleClass