import { Info } from "lucide-react";
import { useState } from "react";

export const ErrorField: React.FC<{ error: string }> = ({ error }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="absolute right-5 top-2.5 cursor-pointer text-red-500"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Info size={16} />
            {showTooltip && (
                <div className="absolute -top-8 w-max right-0 bg-red-50 text-red-700 text-xs px-2 py-1 rounded shadow">
                    {error}
                </div>
            )}
        </div>
    );
}