class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      mode: null,
      errors: null,
      room: null,
    }
    this.handleRoomChange = this.handleRoomChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleRoomChange (e) {
    this.setState({
      room: e.target.value
    })
  }
  handleClick (e) {

  }
  handleCreate (e) {
    var request = $.ajax({
      url: '/room',
      method: 'POST',
    })
    request.success((successfulRegistration) => {
      form.props.changeStates({
        mode: 'Room',
        
      })
    })
  }

  createRoom(){
    if(this.props.sessionID != null && this.props.room == null){
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
        <form>
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
