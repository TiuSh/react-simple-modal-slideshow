import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import simple from 'simple-mock';

import SimpleModalSlideshow from '../src/SimpleModalSlideshow.jsx';
import SimpleModal from '../src/SimpleModal.jsx';
import SimpleSlide from '../src/SimpleSlide.jsx';

// TODO: Test keyboard shortcuts

const slides = [];

for (let i = 0; i < 30; i++) {
  slides.push({
    media: (
      <div>
        {`Media${i}`/*`*/}
      </div>
    ),
    content: (
      <div>
        {`Content${i}`/*`*/}
      </div>
    )
  });
}

describe('<SimpleModalSlideshow />', () => {

  describe('On mount', () => {
    it('should be empty', () => {
      const wrap = mount(<SimpleModalSlideshow slides={slides} />);

      expect(wrap.find('*').length).to.equal(0);

      wrap.unmount();
    });

    it('should open the current slide', () => {
      const wrap = mount(
        <SimpleModalSlideshow
          slides={slides}
          open={true}
          currentSlide={3}
          modalAnimations={false}
          slideAnimations={false}
        />
      );

      expect(wrap.find(SimpleModal).length).to.equal(1);
      expect(wrap.find(SimpleSlide).length).to.equal(1);
      expect(wrap.state('currentSlide')).to.equal(3);
      expect(wrap.contains(<div>Media3</div>)).to.be.true;

      wrap.setProps({ open: false });
      wrap.unmount();
    });

    it('should throw exceptions on API use', () => {
      const wrap = mount(
        <SimpleModalSlideshow
          slides={slides}
          open={true}
        />
      );

      expect(wrap.node.open).to.throw(Error);
      expect(wrap.node.close).to.throw(Error);
      expect(wrap.node.goTo).to.throw(Error);
      expect(wrap.node.goToNext).to.throw(Error);
      expect(wrap.node.goToPrev).to.throw(Error);

      wrap.setProps({ open: false });
      wrap.unmount();
    });
  });

  describe('On props update', () => {
    beforeEach(function() {
      this.wrap = mount(
        <SimpleModalSlideshow
          slides={slides}
          modalAnimations={false}
          slideAnimations={false}
        />
      );

      this.classPrefix = `.${this.wrap.prop('classNamePrefix')}`;
      this.controlsPrefix = `${this.classPrefix}__controls`;
    });

    afterEach(function() {
      this.wrap.setProps({ open: false });
      this.wrap.unmount();
    });

    it('should open the modal', function() {
      this.wrap.setProps({
        open: true,
        currentSlide: 0,
      });

      expect(this.wrap.state('open')).to.be.true;
      expect(this.wrap.find(SimpleModal).length).to.equal(1);
      expect(this.wrap.find(SimpleSlide).length).to.equal(1);
    });

    it('should add a class on html tag when opened', function() {
      expect(document
        .documentElement
        .classList
        .contains(`${this.wrap.prop('classNamePrefix')}--opened`)
      ).to.be.false;

      this.wrap.setProps({
        open: true,
      });

      expect(document
        .documentElement
        .classList
        .contains(`${this.wrap.prop('classNamePrefix')}--opened`)
      ).to.be.true;
    });

    it('should open the right slide', function() {
      this.wrap.setProps({
        open: true,
        currentSlide: 4,
      });

      expect(this.wrap.state('currentSlide')).to.equal(4);
      expect(this.wrap.contains(<div>Media4</div>)).to.be.true;
    });

    it('should close the modal', function() {
      this.wrap.setProps({
        open: false,
      });

      expect(this.wrap.state('open')).to.be.false;
      expect(this.wrap.find(SimpleModal).length).to.equal(0);
      expect(this.wrap.find(SimpleSlide).length).to.equal(0);
    });

    it('should call the callbacks on user events', function() {
      const onNextSpy = simple.spy();
      const onPrevSpy = simple.spy();
      const onCloseSpy = simple.spy();

      this.wrap.setProps({
        open: true,
        currentSlide: 5,
        onNext: onNextSpy,
        onPrev: onPrevSpy,
        onClose: onCloseSpy,
      });

      this.wrap.find(`${this.controlsPrefix}--next`).simulate('click');

      expect(onNextSpy.callCount).to.equal(1);
      expect(onNextSpy.lastCall.args).to.eql([6]);
      expect(this.wrap.state('currentSlide')).to.equal(5);

      this.wrap.find(`${this.controlsPrefix}--prev`).simulate('click');

      expect(onPrevSpy.callCount).to.equal(1);
      expect(onPrevSpy.lastCall.args).to.eql([4]);
      expect(this.wrap.state('currentSlide')).to.equal(5);

      this.wrap.find(`${this.classPrefix}__close`).simulate('click');

      expect(onCloseSpy.callCount).to.equal(1);
      expect(this.wrap.state('open')).to.be.true;
    });
  });

  describe('On use with API', () => {
    beforeEach(function() {
      this.wrap = mount(
        <SimpleModalSlideshow
          slides={slides}
          enableApi={true}
          modalAnimations={false}
          slideAnimations={false}
        />
      );

      this.classPrefix = `.${this.wrap.prop('classNamePrefix')}`;
      this.controlsPrefix = `${this.classPrefix}__controls`;
    });

    afterEach(function() {
      this.wrap.node.close();
      this.wrap.unmount();
    });

    it('should open the modal', function() {
      this.wrap.node.open();

      expect(this.wrap.state('open')).to.be.true;
      expect(this.wrap.find(SimpleModal).length).to.equal(1);
      expect(this.wrap.find(SimpleSlide).length).to.equal(1);
    });

    it('should open the modal, and go to the right slide', function() {
      this.wrap.node.open(11);

      expect(this.wrap.state('open')).to.be.true;
      expect(this.wrap.find(SimpleModal).length).to.equal(1);
      expect(this.wrap.find(SimpleSlide).length).to.equal(1);
      expect(this.wrap.state('currentSlide')).to.equal(11);
      expect(this.wrap.contains(<div>Media11</div>)).to.be.true;
    });

    it('should open the right slide', function() {
      this.wrap.node.open();
      this.wrap.node.goTo(4);

      expect(this.wrap.state('currentSlide')).to.equal(4);
      expect(this.wrap.contains(<div>Media4</div>)).to.be.true;

      this.wrap.node.goToPrev();

      expect(this.wrap.state('currentSlide')).to.equal(3);
      expect(this.wrap.contains(<div>Media3</div>)).to.be.true;

      this.wrap.node.goToNext();

      expect(this.wrap.state('currentSlide')).to.equal(4);
      expect(this.wrap.contains(<div>Media4</div>)).to.be.true;

      this.wrap.find(`${this.controlsPrefix}--prev`).simulate('click');

      expect(this.wrap.state('currentSlide')).to.equal(3);
      expect(this.wrap.contains(<div>Media3</div>)).to.be.true;

      this.wrap.find(`${this.controlsPrefix}--next`).simulate('click');

      expect(this.wrap.state('currentSlide')).to.equal(4);
      expect(this.wrap.contains(<div>Media4</div>)).to.be.true;
    });

    it('should close the modal', function() {
      this.wrap.node.open();
      this.wrap.node.close();

      expect(this.wrap.state('open')).to.be.false;
      expect(this.wrap.find(SimpleModal).length).to.equal(0);
      expect(this.wrap.find(SimpleSlide).length).to.equal(0);

      this.wrap.node.open();

      this.wrap.find(`${this.classPrefix}__close`).simulate('click');

      expect(this.wrap.state('open')).to.be.false;
      expect(this.wrap.find(SimpleModal).length).to.equal(0);
      expect(this.wrap.find(SimpleSlide).length).to.equal(0);
    });

    it('should call the callbacks on user events', function() {
      const onNextSpy = simple.spy();
      const onPrevSpy = simple.spy();
      const onCloseSpy = simple.spy();

      this.wrap.setProps({
        onNext: onNextSpy,
        onPrev: onPrevSpy,
        onClose: onCloseSpy,
      });

      this.wrap.node.open(5);

      this.wrap.find(`${this.controlsPrefix}--next`).simulate('click');

      expect(onNextSpy.callCount).to.equal(1);
      expect(onNextSpy.lastCall.args).to.eql([6]);
      expect(this.wrap.state('currentSlide')).to.equal(5);

      this.wrap.find(`${this.controlsPrefix}--prev`).simulate('click');

      expect(onPrevSpy.callCount).to.equal(1);
      expect(onPrevSpy.lastCall.args).to.eql([4]);
      expect(this.wrap.state('currentSlide')).to.equal(5);

      this.wrap.find(`${this.classPrefix}__close`).simulate('click');

      expect(onCloseSpy.callCount).to.equal(1);
      expect(this.wrap.state('open')).to.be.true;
    });
  });
});
