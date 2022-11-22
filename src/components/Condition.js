import React from 'react';

const Condition = ({text}) => {
  return (
    <div>
      <div className='bg-light-green dib br3 pa3 ma2 bw2 shadow-5'>
          <h3>Condition: {text}</h3>
        </div>
    </div>
  );
}

export default Condition;