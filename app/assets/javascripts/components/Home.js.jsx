class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      mode: null,
      errors: null,
      roomPass: null,
    }
    this.handleRoomChange = this.handleRoomChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleRoomChange (e) {
    this.setState({
      roomPass: e.target.value
    })
  }

  handleClick (e) {
    e.preventDefault()
    let page = this
    var request = $.ajax({
      url: '/rooms/join',
      type: 'POST',
      data: { room: {password: page.state.roomPass}}
    })
    request.success(function (response) {
      page.props.changeStates('Room', page.props.sessionID, page.props.username, response['roomId'])
    })
    request.fail(function(response){
      page.setState({
        mode: 'Home',
        errors: response.errors,
        room: null
      })
    })
  }

  handleCreate (e) {
    let form = this
    var request = $.ajax({
      url: '/rooms',
      method: 'POST',
    })
    request.success(function (response) {
      form.props.changeStates('Room', form.props.sessionID, form.props.username, response['roomId'])
    })
  }

  createRoom(){
    if(this.props.sessionID != null){
      return(
        <button type='button' className='btn btn-default' onClick={this.handleCreate}>Create Room</button>
      )
    }
  }

  render(){
    return(
      <div id ='joining' className ='card'>
        <ul className='errors'>
          {this.state.errors}
        </ul>
        <form action='/rooms/join' method='post'>
          <div className='form-group'>
            <label htmlFor='room'>Enter room Id!</label>
            <input type='text' className='form-control' id='room' placeholder='TH15' onChange={this.handleRoomChange} />
          </div>

          <div className='register-btn'>
            <button type='submit' className='btn btn-default' onClick={this.handleClick}>Join</button>
          </div>
        </form>
        <div id='create-room'>
          {this.createRoom()}
        </div>
      </div>
    )
  }
}
