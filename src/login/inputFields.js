function InputFields(props) {

  return ( <div className="flex creds">
    <label className="credLabels" htmlFor={props.htmlFor}>
      {props.label ?? 'label'}:
    </label>
    <div className='inputChild'>
    <input
      type= {props.type ?? "text"}
      name={props.name}
      id={props.name}
      className= {"credFields userName "+props.inputClass}
      placeholder= {props.placeholder ?? ''}
      {...props.register}
    />
    {props.child}</div>
    {(props.showAlert ?? false) && <span className='validationAlert'>{props.messgae}</span>}
  </div>
  )
}

export default InputFields