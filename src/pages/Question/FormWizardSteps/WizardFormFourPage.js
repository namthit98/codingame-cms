import React from 'react'
import { reduxForm } from 'redux-form'
import validate from './validate';

const WizardFormFourPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <h6 className="text-muted">Confirm Detail</h6>
      <fieldset>
        <div className="p-3">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">I agree with the Terms and Conditions.</label>
          </div>
        </div>
      </fieldset>

    </form>
  )
}
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFourPage)