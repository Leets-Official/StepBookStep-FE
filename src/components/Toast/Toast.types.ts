export interface ToastProps {
    message: string;  
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
    className?: string;
    action?: {
        label: string;
        onClick: () => void;
    } | null;
}
