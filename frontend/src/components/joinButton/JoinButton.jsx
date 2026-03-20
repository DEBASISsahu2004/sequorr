import { useModal } from '../../context/ModalContext';
import styles from './JoinButton.module.css';

const JoinButton = ({ className }) => {
  const { openJoinModal } = useModal();
  const handleJoinClick = () => {
    openJoinModal();
  };

  return (
    <button onClick={handleJoinClick} className={`${styles.btnPrimary} ${className ? className : ''}`}>
      Join the Movement
    </button>
  );
};

export default JoinButton;
