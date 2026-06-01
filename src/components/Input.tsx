interface InputProps {
    label: string
    type?: string
    placeholder?: string 
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string
}

function Input(props: InputProps){
    return(
        <div className="flex flex-col gap-1 w-full">

        <label className="text-sm font-medium text-gray-700">
          {props.label}
        </label>
  
        <input
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all
            focus:ring-2 focus:ring-blue-500
            ${props.error ? "border-red-500" : "border-gray-300"}`}
        />
  
        {props.error && (
          <p className="text-red-500 text-xs">{props.error}</p>
        )}
  
      </div>
    );
}

export default Input;