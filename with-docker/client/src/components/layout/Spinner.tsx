import * as React from 'react';

interface Props {

}

const Spinner: React.FC<Props> = () => (
  <>
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </>
);
export default Spinner;
