/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle?: string;
  text?: string;
  link1: string;
  link2?: string;
  path1: string;
  path2?: string;
}

const Card: React.FC<Props> = ({
  title, subtitle,
  text, link1,
  link2, path1, path2,
}) => (
  <div className="card my-5" style={{ width: '26rem', padding: '3rem' }}>
    <div className="card-body">
      <h5 className="card-title display-4">{title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
      <p className="card-text my-3">{text}</p>
      <Link to={path1} className="card-link btn-lg btn-primary mt-3">{link1}</Link>
      {path2 && <Link to={path2} className="card-link">{link2}</Link> }

    </div>
  </div>
);
export default Card;
