//Modal.tsx
//ゴールした時にモーダルウィンドウを表示
import React from 'react';
import Confetti from 'react-confetti';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalLabelSum: number;  // 追加
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, totalLabelSum }) => {
  if (!isOpen) return null;

  const message =
    totalLabelSum === 27
      ? {
          title: "おめでとう！！いちばん早くついたよ！天才だね！",
        }
      : {
          title: "よくやったね！でも、もっと早い道があるかも？もう一度ちょうせんしてみよう！",
        };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        {totalLabelSum === 27 && <Confetti />}
        <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: "bold" }}>
          {message.title}
        </h2>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', marginBottom: '30px' }}>
          総時間：
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '28px', fontWeight: "bold" }}>
            {totalLabelSum}
          </span>
          時間
        </p>
        <button onClick={onClose} style={buttonStyle}>リセット</button>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center' as const,
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Modal;
