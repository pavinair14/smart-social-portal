import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { SuggestionModalProps } from "./types";
import { Sparkle } from "lucide-react";

export const SuggestionModal: React.FC<SuggestionModalProps> = (props) => {
    const { open, setOpen, loading, suggestion, setSuggestion, handleRewrite, handleAccept } = props;

    const handleCancel = () => {
        setOpen(false);
        setSuggestion("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>AI Suggestion</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <p className="text-sm text-muted-foreground">Generating suggestion...</p>
                ) : (
                    <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap min-h-[80px]">
                        {suggestion}
                    </div>
                )}
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={handleRewrite} disabled={loading}>
                        <Sparkle className={`inline-block text-violet-900 ${loading ? "animate-spin" : ""}`} size={16} /> Rewrite
                    </Button>
                    <Button onClick={handleAccept} disabled={loading}>
                        Accept
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}