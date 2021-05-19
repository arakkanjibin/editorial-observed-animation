import React, { useState, useEffect } from 'react';
import htmlToReact from 'html-to-react';
import PropTypes from 'prop-types';
import './App.css';

const htmlToReactParser = new htmlToReact.Parser();

const renderHeadline = (headline) => {
  if (headline) {
    return (
      <h2
        style={{ animation: headline.animationType, animationDuration: headline.animationDuration }}
        className="editorial__header"
      >
        {htmlToReactParser.parse(headline.text)}
      </h2>
    );
  }
  return null;
};

const renderParagraph = (paragraph) => {
  if (paragraph) {
    return (
      <p
        style={{
 animation: paragraph.animationType,
          animationDuration: paragraph.animationDuration,
}}
        className="editorial__paragraph"
      >
        {htmlToReactParser.parse(paragraph.text)}
      </p>);
  }
  return null;
};



const Editorial = (props) => {
  const [showAnimation, setAnimation] = useState(false);
  const [sectionElement, setSectionElement] = useState(null);

  const observeElement = () => {

    if (!window.IntersectionObserver) {
      setAnimation(true);
      return;
    }

    const options = { 
      root: null,
      threshold: 0,
      rootMargin: "-150px"
    }

    const observer = new IntersectionObserver(function(entries, observer){
      entries.forEach( entry => {
        if(showAnimation != entry.isIntersecting && window.screen.width > 299){
          setAnimation(!showAnimation);
          }
      })
    }, options)
    
    if(sectionElement){
      [sectionElement].forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
    }
  }

  useEffect(() => {
    observeElement();
  });

  

  const {
    headline,
    paragraph,
    image,
  } = props.content;

  const {
    className,
    config,
  } = props;


  const rowClass = config.textPosition && config.textPosition === 'left'
    ? `section-editorial__text-left` : `section-editorial__text-right`;

  return (
    <section
      className={`${className} section-editorial ${rowClass}`}
      data-building-block="organism"
      ref={(el) => {
        setSectionElement(el);
        }}
    >
      <div className="container">
        <div className={`row`} >
          <div className={`col-sm-12 editorial__inner-wrap editorial--image-panel `}>
            { showAnimation && <img
            style={{
              animation: image.animationType,
                         animationDuration: image.animationDuration,
             }}
              alt={image.alt}
              src={image.url}
              key={`${image.alt}-${image.id}`}
              className={image.className}
        />}
          </div>

          <div className={`col-sm-12 editorial__inner-wrap details-panel `}>
            { showAnimation &&
            <div style={{
 animation: config.animationType,
            animationDuration: config.animationDuration,
}}
            >
              {renderHeadline(headline)}
              {renderParagraph(paragraph)}
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Editorial;


Editorial.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    animationType: PropTypes.string,
    animationDuration: PropTypes.string,
  }),
  content: PropTypes.shape({
    headline: PropTypes.shape({
      text: PropTypes.string,
      animationType: PropTypes.string,
      animationDuration: PropTypes.string,
    }),
    paragraph: PropTypes.shape({
      text: PropTypes.string,
      animationType: PropTypes.string,
      animationDuration: PropTypes.string,
    }),
    image: PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      animationType: PropTypes.string,
      animationDuration: PropTypes.string,
      alt: PropTypes.string,

    })
  }),
  className: PropTypes.string,
};

Editorial.defaultProps = {
  config: {
    id: '',
    animationType: 'moveDown',
    animationDuration: '1s',
    textPosition: 'left',
  },
  content: {
    headline: {
      text: 'Header goes here',
    },
    paragraph: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    image:{
      id: '',
      url: 'https://images.unsplash.com/photo-1621248314539-fc8ed5a18c0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
      alt: 'alt text',
      animationType: 'moveUp',
      animationDuration: '1s',
    }
  },
  className: '',
};
