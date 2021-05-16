import React from 'react'
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from 'react-icons/ti'
import { AiOutlineGoogle } from 'react-icons/ai'

const SocialMedias = () => {
  return (
    <div className="social-media">
      <a href="/" className="social-icon">
        <i>
          <TiSocialFacebook size="40px" />
        </i>
      </a>
      <a href="/" className="social-icon">
        <i>
          <TiSocialTwitter size="40px" />
        </i>
      </a>
      <a href="/" className="social-icon">
        <i>
          <AiOutlineGoogle size="40px" />
        </i>
      </a>
      <a href="/" className="social-icon">
        <i>
          <TiSocialLinkedin size="45px" />
        </i>
      </a>
    </div>
  )
}

export default SocialMedias
