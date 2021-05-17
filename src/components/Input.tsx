import React from 'react'

const Input = (props) => {
  return (
    <div className="input-field">
      <i>{props.icon}</i>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Input
