import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.scss';

const Loader = () => {
  return (
    <Skeleton
      className="loader"
      count={10}
      inline={true}
      containerClassName="list__body"
    />
  );
};

export default Loader;
