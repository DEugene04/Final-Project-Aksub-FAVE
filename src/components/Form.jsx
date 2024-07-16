import "../register.css"

export default function Form({htmlFor,type,name,placeholder,onChange, id, label, errors, steps, value}){
    return (
        <div className="register__inputs">
            <label htmlFor={htmlFor}>{label}</label>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                id={id}
                step={steps}
                value={value}
            />
            {errors && <p className="error-message">{errors}</p>}
        </div>
        
    )
}