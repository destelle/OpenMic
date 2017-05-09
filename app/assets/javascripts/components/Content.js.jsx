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
        this.changeStates('Login')
      }
    })
  }

  changeStates (mode, sessionID = null, username = null) {
    const registration = <RegistrationForm changeStates={this.changeStates} />
    const login = <Login changeStates={this.changeStates} />
    let stateVariable = null
    switch (mode) {
      case 'Register':
        stateVariable = registration
        break
      case 'Login':
        stateVariable = login
        break
      default:
        stateVariable = login
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
        {this.state.mode}
      </div>
    )
  };
};
