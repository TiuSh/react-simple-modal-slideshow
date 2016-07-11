import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SimpleSlide from './SimpleSlide.jsx';

export default class SimpleModal extends Component {
  render() {
    return (
      <div className={this.props.classNamePrefix}>
        <a
          className={`${this.props.classNamePrefix}__close`}
          onClick={this.props.onClose}
        >
          Close
        </a>

        <ReactCSSTransitionGroup
          component="div"
          transitionName={{
            enter: `${this.props.classNamePrefix}__slide-enter`
              + `-${this.props.slideAnimationDirection}`,
            enterActive: `${this.props.classNamePrefix}__slide-enter`
              + `-${this.props.slideAnimationDirection}-active`,
            leave: `${this.props.classNamePrefix}__slide-leave`
              + `-${this.props.slideAnimationDirection}`,
            leaveActive: `${this.props.classNamePrefix}__slide-leave`
              + `-${this.props.slideAnimationDirection}-active`,
          }}
          transitionEnter={this.props.slideAnimations}
          transitionLeave={this.props.slideAnimations}
          transitionEnterTimeout={this.props.slideTransitionEnterTimeout}
          transitionLeaveTimeout={this.props.slideTransitionLeaveTimeout}
        >
          <SimpleSlide
            {...this.props}
            key={this.props.slideIndex}
          />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  slide: React.PropTypes.object,
  slideIndex: React.PropTypes.number,
  slideAnimations: React.PropTypes.bool,
  slideAnimationDirection: React.PropTypes.string,
  showPrev: React.PropTypes.bool,
  showNext: React.PropTypes.bool,
  onPrev: React.PropTypes.func,
  onNext: React.PropTypes.func,
  onClose: React.PropTypes.func,
  classNamePrefix: React.PropTypes.string,
  slideTransitionEnterTimeout: React.PropTypes.number,
  slideTransitionLeaveTimeout: React.PropTypes.number,
};
