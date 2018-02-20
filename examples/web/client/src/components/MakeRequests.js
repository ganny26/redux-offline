import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { succeedAlways, succeedSometimes, failSometimes } from '../actions';

class MakeRequests extends React.Component {

  buildHandler = (handler) => {
    const { successCallback, errorCallback } = this.props;
    let promise;
    if (successCallback) {
      promise = handler().then(successCallback);
    }
    if (errorCallback) {
      promise.catch(errorCallback);
    }
    return promise || handler();
  }

  onSucceedAlways = () => this.buildHandler(this.props.onSucceedAlways)

  onSucceedSometimes = () => this.buildHandler(this.props.onSucceedSometimes)

  onFailSometimes = () => this.buildHandler(this.props.onFailSometimes)

  render() {
    return (
      <div>
        <button onClick={this.onSucceedAlways}>Succeed Always</button>
        <button onClick={this.onSucceedSometimes}>Succeed Sometimes</button>
        <button onClick={this.onFailSometimes}>Fail Sometimes</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onSucceedAlways: succeedAlways,
      onSucceedSometimes: succeedSometimes,
      onFailSometimes: failSometimes
    },
    dispatch
  );
}

const ConnectedComponent = connect(null, mapDispatchToProps)(MakeRequests);

export { MakeRequests as RawComponent };
export default ConnectedComponent;
