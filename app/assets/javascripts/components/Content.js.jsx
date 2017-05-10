class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: null,
      session: null,
      username: null
    }
    this.changeStates = this.changeStates.bind(this)
  }

  componentDidMount () {
    var request = $.ajax({
      url: '/sessions',
      type: 'GET'
    })
    request.done((response) => {
      if (response.sessionID) {
        this.changeStates('Home', response.sessionID, response.userName)
      } else {
        this.changeStates('Home')
      }
    })
  }

  changeStates (mode, sessionID = null, username = null, roomIn = null) {
    const home = <Home room={roomIn} sessionID={sessionID} changeStates={this.changeStates}/>
    const room = 'hi'
    let stateVariable = null
    switch (mode) {
      case 'Room':
        stateVariable = room
        break
      default:
        stateVariable = home
        break
    }
    this.setState({
      mode: stateVariable,
      session: sessionID,
      username: username
    })
  }
  render () {
    return (
      <div>
        <Navbar user={this.state.username} session={this.state.session} changeStates={this.changeStates} />
        <div id='overlay'>
          {this.state.mode}
        </div>
      </div>
    )
  };
};
