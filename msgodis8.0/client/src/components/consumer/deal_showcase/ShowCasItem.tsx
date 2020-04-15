import * as React from 'react';


interface Props {
  deal: Record<string, any>;
}

const ShowCaseItem: React.FC<Props> = ({ deal }) => (
  <div className="ShowCaseItem">
    <p>
      valid from
      ----
      {deal.valid_from}
      ----
      to
      {deal.valid_to}
    </p>
  </div>
);
export default ShowCaseItem;
