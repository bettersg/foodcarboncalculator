/* eslint-disable no-unused-vars */
import styles from '../../styles/InputBar.module.css';

export const InputBar = ({ placeholder, type, changeHandler }) => {
  return (
    <input placeholder={placeholder} type={type} onChange={(e) => changeHandler(e.target.value)} />
  );
};
