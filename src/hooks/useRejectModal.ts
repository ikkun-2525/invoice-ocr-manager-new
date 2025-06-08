import { useState } from 'react';

export const useRejectModal = () => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const openModal = () => {
    setShowRejectModal(true);
  };

  const closeModal = () => {
    setShowRejectModal(false);
    setRejectReason('');
  };

  const handleReasonChange = (reason: string) => {
    setRejectReason(reason);
  };

  const submitReject = (onReject: (reason?: string) => void) => {
    onReject(rejectReason);
    closeModal();
  };

  return {
    showRejectModal,
    rejectReason,
    openModal,
    closeModal,
    handleReasonChange,
    submitReject
  };
};