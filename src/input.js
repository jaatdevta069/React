import './inputField.css';

const InputField = ({label,placeholder}) => {
  return (
    <div className="card">
   <label className="input">
  <input className="input__field" type="text" placeholder={placeholder ?? " " }/>
  <span className="input__label">{label ?? 'Some Fancy Label'}</span>
</label>
</div>
  )
}

export default InputField
