import * as S from "./ConfirmModal.styles";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className={S.overlay} onClick={onCancel}>
      <div className={S.modal} onClick={(e) => e.stopPropagation()}>
        <p className={S.title}>{title}</p>

        {description && <p className={S.description}>{description}</p>}

        <div className={S.actions}>
          <button className={S.cancelButton} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={S.confirmButton} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
