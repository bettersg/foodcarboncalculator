import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const MaskWrapper = styled.div`
  background-color: rgba(28, 28, 28, 0.5);
  height: ${({ isOpen }) => (isOpen ? '100%' : 0)};
  left: 0;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  position: absolute;
  top: 0;
  transition: ${({ isOpen }) => (isOpen ? 'none' : 'opacity .2s linear, height 0s ease .2s')};
  width: 100%;
`;

const Mask = ({ isOpen, onClick }) => <MaskWrapper isOpen={isOpen} onClick={onClick} />;

const ModalWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  animation: ${fadeIn} 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  background-color: #f8f8fc;
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  padding: 14px 25px;
  position: relative;
  width: 80vw;
  z-index: 1;
`;

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <ModalWrapper>
      <Mask isOpen onClick={onClose} />
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>
  );
};
