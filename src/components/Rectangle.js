import React from 'react';

export const Rectangle = ({ vertical, horizontal, size, ...props }) =>
    (<div style={{
        position: 'absolute',
        display: 'flex', height: size, width: size, borderRadius: size, justifyContent: 'center',
        top: `calc(50% - ${size}px/2 + ${vertical}%)`,
        left: `calc(50% - ${size}px/2 + ${horizontal}%)`,
    }}
          {...props} />);