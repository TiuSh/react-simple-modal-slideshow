import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import debug from 'debug';

import SimpleModal from './SimpleModal.jsx';

const log = debug('modal-slideshow:log');

export default class SimpleModalSlideshow extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      open: false,
      currentSlide: 0,
      slideAnimationDirection: 'left',
    };

    // Prepare keyboard event listener
    this._handleKeyboardInput = ::this._handleKeyboardInput;

    // Bind API
    this.goTo = ::this.goTo;
    this.goToNext = ::this.goToNext;
    this.goToPrev = ::this.goToPrev;
    this.open = ::this.open;
    this.close = ::this.close;
  }

  componentDidMount() {
    // Initially set current slide
    if (this.props.currentSlide) {
      this._goTo(this.props.currentSlide);
    }

    // Initially open the modal
    if (this.props.open) {
      this._open();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Listen "open" / "currentSlide" props only if the API is disabled
    if (!nextProps.enableApi) {
      // Update current slide
      this._goTo(nextProps.currentSlide);

      // Make sure to open/close only when needed
      if (!this.props.open && nextProps.open) {
        this._open();
      } else if (this.props.open && !nextProps.open) {
        this._close();
      }
    }

    // If classNamePrefix is updated, make sure to update flag on html tag if set
    if (nextProps.classNamePrefix !== this.props.classNamePrefix) {
      document.documentElement.classList.remove(`${this.props.classNamePrefix}--opened`);
      document.documentElement.classList.add(`${nextProps.classNamePrefix}--opened`);
    }
  }

  /**
   * Keyboard event listener
   *
   * @param {Event} event Keyboard event
   */
  _handleKeyboardInput(event) {
    log(`Keyboard input captured (keyCode=${event.keyCode})`);

    // Left arrow
    if (event.keyCode === 37) {
      this._handlePrev();
    // Right arrow
    } else if (event.keyCode === 39) {
      this._handleNext();
    // Esc
    } else if (event.keyCode === 27) {
      this._handleClose();
    }
  }

  /**
   * Handle close event
   */
  _handleClose() {
    log('Handle Close');

    // If props.onClose is supplied, call it and stop here
    if (this.props.onClose) {
      this.props.onClose();
      return;
    }

    // If API is disabled only the parent can control the slideshow
    // through props.onClose
    if (this.props.enableApi) {
      this.close();
    }
  }

  /**
   * Handle prev event
   */
  _handlePrev() {
    const currentSlide = this.state.currentSlide;
    const prevSlide = currentSlide - 1;

    // Make sure there's a slide before the current one
    if (currentSlide <= 0) {
      return;
    }

    log('Handle Prev');

    // If props.onPrev is supplied, call it and stop here
    if (this.props.onPrev) {
      this.props.onPrev(prevSlide);
      return;
    }

    // If API is disabled only the parent can control the slideshow
    // through props.onPrev
    if (this.props.enableApi) {
      this._goTo(prevSlide);
    }
  }

  /**
   * Handle next event
   */
  _handleNext() {
    const currentSlide = this.state.currentSlide;
    const nextSlide = currentSlide + 1;

    // Make sure there's a slide after the current one
    if (nextSlide >= this.props.slides.length) {
      return;
    }

    log('Handle Next');

    // If props.onNext is supplied, call it and stop here
    if (this.props.onNext) {
      this.props.onNext(nextSlide);
      return;
    }

    // If API is disabled, only the parent component can control the slideshow
    // through props.onNext
    if (this.props.enableApi) {
      this._goTo(nextSlide);
    }
  }

  _goToPrev() {
    const currentSlide = this.state.currentSlide;
    const prevSlide = currentSlide - 1;

    if (currentSlide <= 0) {
      return;
    }

    this._goTo(prevSlide);
  }

  _goToNext() {
    const currentSlide = this.state.currentSlide;
    const nextSlide = currentSlide + 1;

    if (nextSlide >= this.props.slides.length) {
      return;
    }

    this._goTo(nextSlide);
  }

  _goTo(index) {
    if (this.props.slides.length === 0) {
      return;
    }

    // Make sure the slide exists
    if (index < 0 || index >= this.props.slides.length) {
      throw new Error(`Invalid index '${index}' supplied to SimpleModalSlideshow::goTo()`);
    }

    log(`Go to slide ${index}`);

    // Update state with the new index and animation direction
    this.setState({
      currentSlide: index,
      slideAnimationDirection: index < this.state.currentSlide ?
        'right'
        : 'left',
    });
  }

  _close() {
    log('Close');

    // Remove class from html tag
    document.documentElement.classList.remove(`${this.props.classNamePrefix}--opened`);

    // Remove keyboard event listener
    document.removeEventListener('keydown', this._handleKeyboardInput);

    // Update state
    this.setState({
      open: false,
    });
  }

  _open(index) {
    log('Open');

    // Add a class to the body (to disable background scroll)
    document.documentElement.classList.add(`${this.props.classNamePrefix}--opened`);

    // Enable keyboard event listener
    document.addEventListener('keydown', this._handleKeyboardInput);

    // If an index is given, jump to the slide before opening
    if (index !== undefined) {
      this._goTo(index);
    }

    // Update state
    this.setState({
      open: true,
    });
  }

  /**
   * Go to previous slide
   */
  goToPrev() {
    if (!this.props.enableApi) {
      throw new Error('SimpleModalSlideshow API is disabled');
    }

    this._goToPrev();
  }

  /**
   * Go to next slide
   */
  goToNext() {
    if (!this.props.enableApi) {
      throw new Error('SimpleModalSlideshow API is disabled');
    }

    this._goToNext();
  }

  /**
   * Go to a specific slide
   *
   * @param {Int} index Slide index to go to
   */
  goTo(index) {
    if (!this.props.enableApi) {
      throw new Error('SimpleModalSlideshow API is disabled');
    }

    this._goTo(index);
  }

  /**
   * Open the slideshow
   *
   * @param {Int} index If specified, the given slide will be opened
   */
  open(index) {
    if (!this.props.enableApi) {
      throw new Error('SimpleModalSlideshow API is disabled');
    }

    this._open(index);
  }

  /**
   * Close the slideshow
   */
  close() {
    if (!this.props.enableApi) {
      throw new Error('SimpleModalSlideshow API is disabled');
    }

    this._close();
  }

  render() {
    let modal = null;

    // Modal is added to the DOM only if it has a slide to display
    if (
      this.props.slides.length > 0
      && this.state.open
    ) {
      modal = (
        <SimpleModal
          key="modal-slideshow"
          slide={this.props.slides[this.state.currentSlide]}
          slideIndex={this.state.currentSlide}
          slideAnimations={this.props.slideAnimations}
          slideAnimationDirection={this.state.slideAnimationDirection}
          slideTransitionEnterTimeout={this.props.slideTransitionEnterTimeout}
          slideTransitionLeaveTimeout={this.props.slideTransitionLeaveTimeout}
          showPrev={this.state.currentSlide > 0}
          showNext={this.state.currentSlide < this.props.slides.length - 1}
          onPrev={::this._handlePrev}
          onNext={::this._handleNext}
          onClose={::this._handleClose}
          classNamePrefix={this.props.classNamePrefix}
        />
      );
    }

    return (
        <ReactCSSTransitionGroup
          component="div"
          transitionName={`${this.props.classNamePrefix}__modal`}
          transitionEnter={this.props.modalAnimations}
          transitionLeave={this.props.modalAnimations}
          transitionEnterTimeout={this.props.modalTransitionEnterTimeout}
          transitionLeaveTimeout={this.props.modalTransitionLeaveTimeout}
        >
          {modal}
        </ReactCSSTransitionGroup>
    );
  }
}

SimpleModalSlideshow.propTypes = {
  // Slides
  slides: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      media: React.PropTypes.node.isRequired,
      content: React.PropTypes.node,
    })
  ).isRequired,

  // Controls
  open: React.PropTypes.bool,
  currentSlide: React.PropTypes.number,

  // Options
  enableApi: React.PropTypes.bool,
  classNamePrefix: React.PropTypes.string,

  // Animations
  modalAnimations: React.PropTypes.bool,
  slideAnimations: React.PropTypes.bool,
  modalTransitionEnterTimeout: React.PropTypes.number,
  modalTransitionLeaveTimeout: React.PropTypes.number,
  slideTransitionEnterTimeout: React.PropTypes.number,
  slideTransitionLeaveTimeout: React.PropTypes.number,

  // Event listeners
  onClose: React.PropTypes.func,
  onPrev: React.PropTypes.func,
  onNext: React.PropTypes.func,
};

SimpleModalSlideshow.defaultProps = {
  open: false,
  currentSlide: 0,
  enableApi: false,
  classNamePrefix: 'modal-slideshow',
  modalAnimations: true,
  slideAnimations: true,
  modalTransitionEnterTimeout: 300,
  modalTransitionLeaveTimeout: 300,
  slideTransitionEnterTimeout: 300,
  slideTransitionLeaveTimeout: 300,
};
