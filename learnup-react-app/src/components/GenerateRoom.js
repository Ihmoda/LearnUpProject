import React, { Component } from 'react';

class GenerateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingURL: '',
      id: '',
    };
  }
  generateRoom = event => {
    const id = localStorage.getItem('id');
    this.setState(() => ({
      meetingURL: `${window.location.href}/board/${id}`,
      id: id,
    }));
  };

  handleEnterRoom = event => {
    const { history } = this.props;
    const { id } = this.state;
    history.push(`/board/${id}`);
  };

  isDisabled = () => {
    return this.state.meetingURL === '';
  };

  render() {
    const { meetingURL } = this.state;
    return (
      <div>
        <div className="row gen-room">
          <div className="col-md-2" />
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2" />
              <div className="form-group col-md-4">
                <button
                  type="button"
                  id="genRoomButton"
                  className="btn btn-block btn-primary"
                  onClick={this.generateRoom}
                >
                  Generate Room
                </button>
              </div>
              <div className="col-md-2" />
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <p>{meetingURL}</p>
              </div>
            </div>
            <div id="enterRoom" className="col-md-12" method="get">
              <div className="form-group">
                <button
                  type="submit"
                  name=""
                  id="enterRoomButton"
                  onClick={this.handleEnterRoom}
                  className="btn btn-primary"
                  disabled={this.isDisabled()}
                >
                  Enter Room
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default GenerateRoom;
