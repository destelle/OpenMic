class Navbar extends React.Component {
  constructor(){
    super()
    this.loginHandler = this.loginHandler.bind(this)
    this.registerHandler = this.registerHandler.bind(this)
    this.state = {
      popout: null,
    }
  }

  componentDidMount () {
    this.sessionId()
    this.userName()
  }

  logoutHandler (e) {
    e.preventDefault()
    $.ajax({
      url: '/sessions',
      type: 'DELETE'
    }).done((response) => {
      this.props.changeStates('Login')
    })
  }

  loginHandler(e){
    e.preventDefault()
    this.setState({
      popout: <Popout mode={<Login changeStates={this.props.changeStates} />}/>
    })
    $('#popout').css('visibility', 'visible')
  }

  registerHandler(e){
    e.preventDefault()
    this.setState({
      popout: <Popout mode={<RegistrationForm changeStates={this.props.changeStates} />}/>
    })
    $('#popout').css('visibility', 'visible')
  }

  sessionId () {
    if (this.props.session) {
      return (
        <button type='button' className='btn btn-default navbar-btn' href='#' onClick={this.logoutHandler.bind(this)}>Logout</button>
      )
    }
    else {
      return(
        <span id ='links'>
          <a className='register-link' href='#' onClick={this.loginHandler}>Login</a> /
          <a className='register-link' href='#' onClick={this.registerHandler}>Register</a>
      </span>
      )
    }
  }

  homeLink () {
    const handler = (e) => {
      e.preventDefault()
      if (this.props.roomIn) {
        this.props.changeStates('Room', this.props.session, this.props.user, this.props.roomIn)
      } else {
        this.props.changeStates('Home',this.props.session, this.props.user)
      }
    }
    return (
      <a href='#' id='logo' onClick={handler} className='navbar-brand'>Open Mic</a>
    )
  }

  userName () {
    if (this.props.user) {
      return (
        <span id='nav-username' className='navbar-text pull-left'>{this.props.user}</span>
      )
    }
  }
  render () {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          {this.userName()}
          <div className='navbar pull-right navbar-right'>
            {this.sessionId()}
          </div>
        </div>
        <div className='navbar-center'>
          {this.homeLink()}
        </div>

        {this.state.popout}
      </nav>

    )
  }
}
