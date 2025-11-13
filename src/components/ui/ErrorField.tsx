import { Info } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";

export const ErrorField: React.FC<{ error: string; fieldId?: string }> = memo(({ error, fieldId }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const errorId = fieldId ? `${fieldId}-error` : undefined;
    const { t } = useTranslation();

    const handleMouseEnter = useCallback(() => setShowTooltip(true), []);
    const handleMouseLeave = useCallback(() => setShowTooltip(false), []);

    return (
        <div
            className="absolute right-5 top-2.5 cursor-pointer text-red-500"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="alert"
            aria-live="polite"
        >
            <Info size={16} aria-label={t('aria.errorInfo')} />
            {showTooltip && (
                <div
                    id={errorId}
                    className="absolute -top-8 w-max right-0 bg-red-50 text-red-700 text-xs px-2 py-1 rounded shadow"
                    role="tooltip"
                >
                    {error}
                </div>
            )}
        </div>
    );
});