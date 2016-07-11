import React, { Component } from 'react';

import SimpleModalSlideshow from 'react-simple-modal-slideshow';

const imgs = [];
const slides = [];

for (let i = 0; i < 30; i++) {
  imgs.push(`https://unsplash.it/200/200?image=${i}`);

  slides.push({
    media: (
      <img src={`https://unsplash.it/600/400?image=${i}`} />
    ),
  });
}

export default class Example3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentSlide: 0,
    };
  }

  handlePrev(index) {
    this.setState({
      currentSlide: index,
    });
  }

  handleNext(index) {
    this.setState({
      currentSlide: index,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  openSlideshow(index) {
    this.setState({
      open: true,
      currentSlide: index,
    });
  }

  render() {
    return (
      <div>
        <p>
          Click on any of the following images to open the slideshow :
        </p>
        <div className="example-gallery">
          {
            imgs.map((img, index) => (
              <div
                className="example-gallery__img"
                key={index}
                onClick={this.openSlideshow.bind(this, index)}
              >
                <img src={img}/>
              </div>
              ))
          }
        </div>
        <SimpleModalSlideshow
          slides={slides}
          currentSlide={this.state.currentSlide}
          open={this.state.open}
          onClose={::this.handleClose}
          onNext={::this.handleNext}
          onPrev={::this.handlePrev}
          classNamePrefix="modal-slideshow-example3"
        />
      </div>
    );
  }
}
