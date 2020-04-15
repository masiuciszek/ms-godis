import * as React from 'react';

interface Props {

}

const EditOrderForm: React.FC<Props> = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form id="EditOrderForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="qty">
          <span>Qty: </span>
          <input type="text" placeholder="qty" name="qty" />
        </label>
      </div>
    </form>
  );
};
export default EditOrderForm;
