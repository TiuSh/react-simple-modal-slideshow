# react-simple-modal-slideshow
[![Build Status](https://travis-ci.org/TiuSh/react-simple-modal-slideshow.svg?branch=master)](https://travis-ci.org/TiuSh/react-simple-modal-slideshow)

A simple React modal media slideshow with CSS powered animations.

## Install

```
$ npm install react-simple-modal-slideshow
```

## Demo

https://tiush.github.io/react-simple-modal-slideshow/

Or locally:

```
$ git clone https://github.com/TiuSh/react-simple-modal-slideshow.git
$ cd react-simple-modal-slideshow
$ npm install
$ npm run dev
```

## Usage

```js
import { Component } from 'react';
import SimpleModalSlideshow from 'react-simple-modal-slideshow';

export default SomeComponent extends Component {
  /* (...) */

  render() {
    return (
      <SimpleModalSlideshow
        slides={[{
          media: (
            <img src="https://unsplash.it/600/400?image=0" />
          ),
          content: (
            <div>
              Donec id elit non mi porta gravida at eget metus.
              Sed posuere consectetur est at lobortis.
            </div>
          ),
        }, {
          media: (
            <img src="https://unsplash.it/600/400?image=1" />
          ),
          content: (
            <div>
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              Donec ullamcorper nulla non metus auctor fringilla.
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </div>
          ),
        }]}
        open={this.state.open}
        currentSlide={this.state.currentSlide}
        onClose={::this.handleClose}
        onNext={::this.handleNext}
        onPrev={::this.handlePrev}
      />
    );
  }
}
```

Then copy the `lib/simple-modal-slideshow.css`, and include it in your HTML page if you want to
use the default styling. Or you can directly import `src/simple-modal-slideshow.scss` from a SASS
file. See [Styling](#styling) for more informations.

## Options

### slides
**required** | Type: `Array` | Default: `undefined`

Each slide is represented by an object :

#### slide.media
**required** | Type: `Anything that can be rendered` | Default: `undefined`

Media element of the slide.

#### slide.content
Type: `Anything that can be rendered` | Default: `undefined`

Optional content to be displayed with the media.

### open
Type: `Boolean` | Default: `false`

Whether the modal is opened.

### currentSlide
Type: `Integer` | Default: `0`

Index of the slide to display (if modal is opened).

### enableApi
Type: `Boolean`| Default: `false`

If set to `true` the public API will be enabled, and props `open` and `currentSlide`
will be ignored. See the [API](#api) section for more informations. **Warning:** Please note
that this prop has been designed to be statically set (e.g. `enableApi={true}`), so updating
this value during the lifecycle of the component may lead to an unknown behaviour.

### classNamePrefix
Type: `String`| Default: `modal-slideshow`

Every HTML class name in this component is prefix with this string (see [Styling](#styling)).
You can set this prop for example if you want to style multiple slideshows differently.

### modalAnimations
Type: `Boolean` | Default: `true`

If set to `true` modal animations (opening and closing) will be enabled.
See the [Animations](#animations) section for more informations.

### slideAnimations
Type: `Boolean` | Default: `true`

If set to `true` slide animations (when updating current slide index) will be enabled.
See the [Animations](#animations) section for more informations.

### modalTranstionEnterTimeout
Type: `Integer` | Default: `300`

Modal `enter` CSS animation duration.

### modalTranstionLeaveTimeout
Type: `Integer` | Default: `300`

Modal `leave` CSS animation duration.

### slideTranstionEnterTimeout
Type: `Integer` | Default: `300`

Slide `enter` CSS animation duration. Note that it will be the same for `left` and `right`
animations.

### slideTranstionLeaveTimeout
Type: `Integer` | Default: `300`

Slide `leave` CSS animation duration. Note that it will be the same for `left` and `right`
animations.

### onClose
Type: `Function` | Default: `undefined`

Function called when the user clicks on the `a.modal-slideshow__close` tag,
or when he hit the `ESC` key.

If `enableApi` is set to `true` and this prop is omitted the component will automatically
close the slideshow. Otherwise this function is responsible for closing the slideshow.

### onPrev
Type: `Function` | Default: `undefined`

Function called when the user clicks on the `a.modal-slideshow__controls--prev` tag,
or when he hit the `left arrow` key. The function is called with the previous slide index
as an argument.

If `enableApi` is set to `true` and this prop is omitted the component will automatically
go to the previous slide. Otherwise this function is responsible for updating the current
slide index.

### onNext
Type: `Function` | Default: `undefined`

Function called when the user clicks on the `a.modal-slideshow__controls--next` tag,
or when he hit the `right arrow` key. The function is called with the next slide index
as an argument.

If `enableApi` is set to `true` and this prop is omitted the component will automatically
go to the next slide. Otherwise this function is responsible for updating the current
slide index.


## API

When the API is enabled (using the `enableApi` prop), the props `open` and `currentIndex`
are ignored. This way we prevent any situation where the props may be inconsistent with the state
of the component.

### open(index)
* *index* (**optional**): Type: `Integer` | Default: `undefined`

Opens the modal slideshow. Optionally you can specify a slide index to open to a specific slide.

### goTo(index)
* *index*: Type: `Integer` | Default: `undefined`

Goes to a specific slide index.

### goToNext()

Goes to the next slide.

### goToPrev()

Goes to the previous slide.

### close()

Closes the modal slideshow.

### [Example](https://github.com/TiuSh/react-simple-modal-slideshow/blob/master/example/src/example4.jsx)


## Styling

The slideshow is fully custimizable through CSS, or even better with SASS.
Here is the full HTML structure of the modal when opened :

```html
<div class="modal-slideshow">
  <a class="modal-slideshow__close">
    Close
  </a>
  <div>
    <div class="modal-slideshow__slide">
      <div class="modal-slideshow__media">
        <!-- slide.media -->

        <div class="modal-slideshow__controls">
          <a class="modal-slideshow__controls--prev">
            Previous
          </a>
          <a class="modal-slideshow__controls--next">
            Next
          </a>
        </div>
      </div>
      <div class="modal-slideshow__content">
        <!-- slide.content -->
      </div>
    </div>
  </div>
</div>
```

### SASS

The slideshow is originally styled using SASS. Therefor you can directly import the default style
from the `node_modules` folder:

```css
@import 'node_modules/react-simple-modal-slideshow/src/simple-modal-slideshow.scss';

// Your style
```

This SASS file also offers the possibility to customize the default styling using
SASS variables:

#### $modal-slideshow-prefix
Type: `String` | Default: `modal-slideshow`

Should correspond to the `classNamePrefix` prop from the component you want to style.

#### $modal-slideshow-modal-animation
Type: `[false|'fade']` | Default: `fade`

Animation used when opening/closing the modal. When set to false, default modal animations are
disabled, so you can use your own.

#### $modal-slideshow-slide-animation
Type: `[false|'slide'|'zoom']` | Default: `slide`

Animation used when changing slides. When set to false, default slide animations are disabled so
you can use your own.

#### $modal-slideshow-z-index
Type: `Integer` | Default: `9999`


#### Example

```css
$modal-slideshow-prefix: 'example-slideshow';
$modal-slideshow-slide-animation: 'zoom';
@import 'node_modules/react-simple-modal-slideshow/src/simple-modal-slideshow.scss';

// Your style
```

### CSS

You can copy the file `lib/simple-modal-slideshow.css` and simply include it in your HTML page
to use the default styling. Feel free to modify this file to fit your needs.

### Animations

Modal and slides are animated using
[ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) components on
`.modal-slideshow` and `.modal-slideshow__slide` elements. So you can easily create your own
animations with CSS, using these transitions:

#### Modal transitions

##### enter
`.modal-slideshow__modal-enter` / `.modal-slideshow__modal-enter-active`

When modal is opened.

##### leave
`.modal-slideshow__modal-leave` / `.modal-slideshow__modal-leave-active`

When modal is closed.

#### Slide transitions

##### enterLeft
`.modal-slideshow__slide-enter-left` / `.modal-slideshow__slide-enter-left-active`

When the next slide enters.

##### leaveLeft
`.modal-slideshow__slide-leave-left` / `.modal-slideshow__slide-leave-left-active`

When the current slide is leaving for the next one.

##### enterRight
`.modal-slideshow__slide-enter-right` / `.modal-slideshow__slide-enter-right-active`

When the previous slide enters.

##### leaveRight
`.modal-slideshow__slide-leave-right` / `.modal-slideshow__slide-leave-right-active`

When the current slide is leaving for the previous one.


## Licence

MIT
