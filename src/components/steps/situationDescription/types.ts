export type SuggestionModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    loading: boolean;
    suggestion: string;
    setSuggestion: (suggestion: string) => void;
    handleRewrite: () => void;
    handleAccept: () => void;
};
