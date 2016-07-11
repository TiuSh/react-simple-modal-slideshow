import React, { Component } from 'react';

export default class SimpleSlide extends Component {
  render() {
    const prev = this.props.showPrev ?
      <a
        className={`${this.props.classNamePrefix}__controls--prev`}
        onClick={this.props.onPrev}
      >
        Previous
      </a>
      : null;

    const next = this.props.showNext ?
      <a
        className={`${this.props.classNamePrefix}__controls--next`}
        onClick={this.props.onNext}
      >
        Next
      </a>
      : null;

    return (
      <div className={`${this.props.classNamePrefix}__slide`}>
        <div className={`${this.props.classNamePrefix}__media`}>
          {this.props.slide.media}

          <div className={`${this.props.classNamePrefix}__controls`}>
            {prev}
            {next}
          </div>
        </div>

        <div className={`${this.props.classNamePrefix}__content`}>
          {this.props.slide.content}
        </div>
      </div>
    );
  }
}

SimpleSlide.propTypes = {
  slide: React.PropTypes.object,
  showPrev: React.PropTypes.bool,
  showNext: React.PropTypes.bool,
  onPrev: React.PropTypes.func,
  onNext: React.PropTypes.func,
  onClose: React.PropTypes.func,
  classNamePrefix: React.PropTypes.string,
};
