class Room extends React.Component {
  constructor(){
    super()
    this.state = {
      adminId: null,
      adminName: null,
      roomPassword: null
    }
  }
  componentDidMount () {
  let page = this
  $.ajax({
    url: '/rooms/' + this.props.room,
    type: 'GET'
  }).done(function (response) {
    page.setState({
      adminId: response.roomAdminId,
      adminName: response.roomAdminName,
      roomPassword: response.roomPassword
    })
  })
}
deleteHandler(e){
  e.preventDefault()
  $.ajax({
    url: '/rooms/' + this.props.room,
    type: 'DELETE'
  }).done((response) => {
    this.props.changeStates('Home',this.props.sessionID,this.props.username)
  })
}

adminView(){
  if(this.props.sessionID == this.state.adminId){
    return(
      <div>
        <h3>To allow users to Join give them this code:</h3>
        <h4>{this.state.roomPassword}</h4>
        <button type='button' className='btn btn-default' href='#' onClick={this.deleteHandler.bind(this)}>Delete Room</button>
      </div>
    )
  }
}

  render(){
    return(
      <div className='room-show'>
        <div className='header'>
            <h2>{this.state.adminName}'s Room</h2>
            {this.adminView()}
        </div>
      </div>
    )
  }
}
