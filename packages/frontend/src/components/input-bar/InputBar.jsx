import styles from '../../styles/InputBar.module.css';

export const InputBar = ({ placeholder, type, changeHandler, forEdit = false, name = 'input' }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={(e) => changeHandler(e)}
      className={`${forEdit ? styles.edit : ''}`}
      name={name}
    />
  );
};
