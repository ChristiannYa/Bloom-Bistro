import { MdContentCopy } from 'react-icons/md';
import { useState } from 'react';

import { footer } from '../constants/index';
import '../footer.css';

const Footer = () => {
  const [copyMessage, setCopyMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = (text) => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const email = text.match(emailRegex)[0];

    navigator.clipboard.writeText(email).then(() => {
      setCopyMessage('Email copied!');
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    });
  };

  const renderContent = (item) => {
    // Handle object-type content (for logos and socials)
    if (typeof item.content === 'object' && !Array.isArray(item.content)) {
      return (
        <div className="flex items-center gap-x-4">
          <img src={item.content.logo} alt="logo" />
          <div className="flex gap-x-2">
            {item.content.socials.map((social, index) => (
              <img key={index} src={social} alt={`social-${index + 1}`} />
            ))}
          </div>
        </div>
      );
    }
  
    // Handle array-type content
    return item.content.map((text, index) => {
      if (text.includes('@')) {
        return (
          <div key={index} className="flex items-center gap-x-1 text-black-2">
            <span className="tp-2">{text}</span>
            <MdContentCopy
              className="copy-icon cursor-pointer"
              onClick={() => handleCopy(text)}
              title="Copy email"
            />
          </div>
        );
      }
      return (
        <p key={index} className="tp-2 text-black-2">
          {text}
        </p>
      );
    });
  };
  

  return (
    <footer className="w-screen py-custom-1 bg-acc-3">
      <div className="screen font-livvic gap-x-12 gap-y-4 flex flex-wrap">
        {footer.map((item) => (
          <div key={item.id} className="flex-1 basis-[350px]">
            <h3 className="tp-8">{item.title}</h3>
            {renderContent(item)}
          </div>
        ))}
      </div>
      {copyMessage && <div className={`copy-message ${isVisible ? 'show' : ''} bg-black-1 text-acc-3 fixed bottom-5 right-5 rounded-md px-4 py-2`}>
        {copyMessage}
      </div>}
    </footer>
  );
};

export default Footer;
