class Popout extends React.Component {
  constructor(){
    super()
    this.state = {
      mode: null,
    }
    this.exitHandler = this.exitHandler.bind(this)
  }

  exitHandler(e){
    e.preventDefault()
    $('#popout').css('visibility', 'hidden')
  }

  render(){
    return(
      <div id='popout'>
        <button onClick={this.exitHandler} type="button" id='exit' className="btn btn-default btn-sm">
           <span className="glyphicon glyphicon-remove"></span>
        </button>
        {this.props.mode}
      </div>
    )
  }
}
