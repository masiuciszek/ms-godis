/* eslint-disable react/prop-types */
import * as React from 'react';

interface Props {
  title: string;
  spanOne?: string;
  subTitle?: string;
  spanTwo?: string;
  subTitle2?: string;
}

const Title: React.FC<Props> = ({
  title, spanOne, subTitle, spanTwo, subTitle2,
}) => (
  <div className="Title">
    <h1>
      {' '}
      {title}
      {' '}
    </h1>
    <h3>
      <span>{spanOne}</span>
      {' '}
      {subTitle}
      {' '}
      <span>{spanTwo}</span>
      {' '}
      {subTitle2}
      {' '}
    </h3>

  </div>
);
export default Title;
