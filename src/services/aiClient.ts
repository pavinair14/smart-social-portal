import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function getAISuggestion(prompt: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful assistant that provides clear, short-form responses for form inputs.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 60,
        });

        return response.choices[0]?.message?.content?.trim() || "";
    } catch (err) {
        console.error("AI suggestion error:", err);
        return "Sorry, I couldn’t generate a suggestion right now.";
    }
}
