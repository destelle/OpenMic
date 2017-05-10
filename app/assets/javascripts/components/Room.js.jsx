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

  render(){
    return(
      <div className='room-show'>
        <div className='header'>
            <h2>{this.state.adminName}'s Room</h2>
            <h3>To allow users to Join give them this code:</h3>
            <h4>{this.state.roomPassword}</h4>
        </div>
      </div>
    )
  }
}
