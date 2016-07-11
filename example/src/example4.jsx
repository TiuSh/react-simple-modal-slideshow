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

export default class Example4 extends Component {
  constructor(props) {
    super(props);

    this.modalSlideshow = null;
  }

  handlePrev() {
    if (!this.modalSlideshow) {
      return;
    }

    this.modalSlideshow.goToPrev();
  }

  handleNext() {
    if (!this.modalSlideshow) {
      return;
    }

    this.modalSlideshow.goToNext();
  }

  handleClose() {
    if (!this.modalSlideshow) {
      return;
    }

    this.modalSlideshow.close();
  }

  openSlideshow(index) {
    if (!this.modalSlideshow) {
      return;
    }

    this.modalSlideshow.open(index);
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
          ref={modalSlideshow => { this.modalSlideshow = modalSlideshow; }}
          slides={slides}
          enableApi={true}
          onClose={::this.handleClose}
          onNext={::this.handleNext}
          onPrev={::this.handlePrev}
          classNamePrefix="modal-slideshow-example4"
        />
      </div>
    );
  }
}
