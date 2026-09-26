import { forwardRef } from "react";

export const InputField = forwardRef(function ({ error, ...props }, ref) {
  return (
    <>
      <input ref={ref} {...props} />
      {error && (
        <span className="text-sm text-red-500 font-medium mt-0.5 block">
          {error}
        </span>
      )}
    </>
  );
});

export const TextAreaField = forwardRef(function ({ error, ...props }, ref) {
  return (
    <>
      <textarea ref={ref} {...props} />
      {error && (
        <span className="text-sm text-red-500 font-medium mt-0.5 block">
          {error}
        </span>
      )}
    </>
  );
});

// export function TextAreaField({
//   id,
//   className,
//   name,
//   placeholder,
//   required,
//   value,
//   rows,
//   onChange,
//   error,
// }) {
//   return (
//     <>
//       <textarea
//         className={className}
//         id={id}
//         name={name}
//         placeholder={placeholder}
//         required={required}
//         value={value}
//         rows={rows}
//         onChange={onChange}
//       />
//       {error && (
//         <span className="text-sm text-red-500 font-medium mt-1 block">
//           {error}
//         </span>
//       )}
//     </>
//   );
// }

export const SelectField = forwardRef(function (
  { error, options, placeholder, ...props },
  ref,
) {
  return (
    <>
      <select ref={ref} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {error}
        </span>
      )}
    </>
  );
});

// export function SelectField({
//   id,
//   className,
//   name,
//   required,
//   value,
//   onChange,
//   options,
//   error,
// }) {
//   return (
//     <>
//       <select
//         className={className}
//         id={id}
//         name={name}
//         required={required}
//         value={value}
//         onChange={onChange}
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {error && (
//         <span className="text-sm text-red-500 font-medium mt-1 block">
//           {error}
//         </span>
//       )}
//     </>
//   );
// }

export function LabelField({ label, id, className }) {
  return (
    <label className={className} htmlFor={id}>
      {label}
    </label>
  );
}

export const RadioField = forwardRef(function (
  { error, options, ...props },
  ref,
) {
  return (
    <>
      <div className="flex gap-6 mt-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input ref={ref} {...props} value={option.value} type="radio" />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {error}
        </span>
      )}
    </>
  );
});

// export function RadioField({
//   label,
//   options,
//   name,
//   onChange,
//   selectedValue,
//   id,
//   error,
// }) {
//   return (
//     <>
//       <div className="flex gap-6 mt-1">
//         {options.map((option) => (
//           <label
//             key={option.value}
//             className="flex items-center gap-2 cursor-pointer group"
//           >
//             <input
//               type="radio"
//               name={name}
//               id={id}
//               value={option.value}
//               checked={selectedValue === option.value}
//               onChange={onChange}
//               className="w-4 h-4 text-primary focus:ring-primary border-outline"
//             />
//             {option.label}
//           </label>
//         ))}
//       </div>
//       {error && (
//         <span className="text-sm text-red-500 font-medium mt-1 block">
//           {error}
//         </span>
//       )}
//     </>
//   );
// }
