import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAISuggestion } from "../../../services/aiClient";
import { useFormContext } from "react-hook-form";
import { descriptionFields } from "./constants";
import { SuggestionModal } from "./SuggestionModal";
import { Field } from "@/components/shared/Field";
import { Sparkle } from "lucide-react";

export const SituationDescription = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const [activeField, setActiveField] = useState<string | null>(null);
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleAIClick = async (field: string, label: string) => {
        setActiveField(field);
        setLoading(true);
        const userText = watch(field);
        const prompt = `Write a short, realistic description for "${label}". Current text: "${userText || "none"}"`;
        const aiText = await getAISuggestion(prompt);
        setSuggestion(aiText.replace(/"/g, ''));
        setLoading(false);
        setOpen(true);
    };

    const handleAccept = () => {
        if (activeField && suggestion) {
            setValue(activeField, suggestion);
        }
        setOpen(false);
    };

    const handleRewrite = async () => {
        if (!activeField) return;
        setLoading(true);
        const label = descriptionFields.find((f) => f.id === activeField)?.label;
        const prompt = `Rewrite a different short, professional version for "${label}". Keep it realistic and concise.`;
        const aiText = await getAISuggestion(prompt);
        setSuggestion(aiText.replace(/"/g, ''));
        setLoading(false);
    };

    return (
        <>
            <div className="space-y-6">
                {descriptionFields.map((field) => (
                    <div key={field.id} className="relative">
                        <Field
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            as="textarea"
                            fullWidth={true}
                            register={register(field.id, field.validation)}
                            error={errors[field.id]?.message as string | undefined}
                        />
                        <div className="flex justify-end absolute bottom-3 right-3 p-[2px] rounded-md bg-gradient-to-r from-violet-600 to-teal-400 inline-block">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => handleAIClick(field.id, field.label)}
                                //disabled={loading && activeField === field.id}
                                className="bg-white text-violet-950 hover:bg-white w-full rounded-md"
                            >
                                <>
                                    <Sparkle className={`inline-block text-violet-900 ${loading && activeField === field.id ? "animate-spin" : ""}`} size={16} />
                                    <span className="w-25">{loading && activeField === field.id ? "Thinking..." : "Help me write"}</span>
                                </>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for AI suggestion */}
            <SuggestionModal
                open={open}
                setOpen={setOpen}
                loading={loading}
                suggestion={suggestion}
                setSuggestion={setSuggestion}
                handleRewrite={handleRewrite}
                handleAccept={handleAccept}
            />
        </>
    );
}
