/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { connect } from 'react-redux';
import { searchByProducer } from '../../redux/shop/shop.actions';


interface Props {
  producer: string;
  searchByProducer: (producerName: string) => Promise<void>;
}

const LabelItem: React.FC<Props> = ({ producer, searchByProducer }) => (
  <>
    <p className="LabelItem" onClick={() => searchByProducer(producer)}>
      {producer}
    </p>
  </>
);

export default connect(null, { searchByProducer })(LabelItem);
