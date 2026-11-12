import React from 'react';
import './Button.css';

export default function Button(props: any) {
  return (
    <div
      className={'btn btn-' + props.type}
      onClick={props.onClick}
      style={{ backgroundColor: props.disabled ? '#C9CED6' : '#2F6FED', padding: '8px 16px' }}
    >
      {props.loading ? 'Loading...' : props.label}
    </div>
  );
}