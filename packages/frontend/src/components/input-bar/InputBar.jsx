import styles from '../../styles/InputBar.module.css';
import styled from 'styled-components';

const Input = styled.input`
  ::placeholder {
    color: #979797;
    opacity: 1;
  }
`;

export const InputBar = ({ placeholder, type, changeHandler, forEdit = false, name = 'input' }) => {
  return (
    <Input
      placeholder={placeholder}
      type={type}
      onChange={(e) => changeHandler(e)}
      className={`${forEdit ? styles.edit : ''}`}
      name={name}
    />
  );
};
