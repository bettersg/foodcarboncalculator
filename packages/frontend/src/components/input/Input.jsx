export const Input = ({ placeholder, type, onChange }) => {
  return <input placeholder={placeholder} type={type} onChange={(e) => onChange(e.target.value)} />;
};
