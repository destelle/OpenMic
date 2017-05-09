class Navbar extends React.Component {
  constructor(){
    super()
    this.loginHandler = this.loginHandler.bind(this)
    this.registerHandler = this.registerHandler.bind(this)
  }

  componentDidMount () {
    this.sessionId()
    this.userName()
  }

  logoutHandler (e) {
    e.preventDefault()
    $.ajax({
      url: '/sessions/' + this.props.session,
      type: 'DELETE'
    }).done((response) => {
      this.props.changeStates('Login')
    })
  }

  loginHandler(e){
    e.preventDefault()
    debugger
    $('#popout').html('login')
  }

  registerHandler(e){
    e.preventDefault()
    $('#popout').html('register')
  }

  sessionId () {
    if (this.props.session) {
      return (
        <button type='button' className='btn pull-right btn-default navbar-btn navbar-right' href='#' onClick={this.logoutHandler.bind(this)}>Logout</button>
      )
    }
    else {
      return(
        <span>
          <a id='register-link' href='#' onClick={this.loginHandler}>Login</a> /
          <a id='register-link' href='#' onClick={this.registerHandler}>Register</a>
      </span>
      )
    }
  }

  homeLink () {
    const handler = (e) => {
      e.preventDefault()
      if (this.props.session) {
        this.props.changeStates('Home', this.props.session, this.props.user)
      } else {
        this.props.changeStates('Login')
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
        </div>
        <div className='navbar-center'>
          {this.homeLink()}
        </div>
        <div className='navbar pull-right navbar-right'>
          {this.sessionId()}
        </div>
      </nav>

    )
  }
}
