import { getAISuggestion } from "@/lib/openai/getSuggestion";
import { categorizeInput, isHelpRequest, type InputType } from "@/lib/openai/textAnalysis";

/**
 * Generate guidance message for irrelevant input
 */
export const getGuidanceMessage = (context: string): string => {
    return `How can I assist you? I'm here to help you write about ${context}. You can either:\n• Ask me to write it for you (e.g., "help me write about my situation")\n• Provide your information and I'll refine it\n• Leave it blank and I'll generate a sample for you\n\nWhat would you like me to do?`;
};

/**
 * Build appropriate AI prompt based on input type and context
 */
export const buildPrompt = (
    inputType: InputType,
    text: string,
    context: string
): string => {
    switch (inputType) {
        case 'empty':
            return `Generate a clear, professional, and realistic description about ${context}. Write it as if you're the applicant describing your situation.`;

        case 'help-request':
            return `The user is asking: "${text}"\n\nGenerate a professional description about ${context} that answers their request. Write it as the actual content they need, not as a response to their question.`;

        case 'content':
            return `Improve and refine this text about ${context}. Make it more professional, clear, and compelling while keeping the core message:\n\n"${text}"`;

        case 'irrelevant':
        default:
            return '';
    }
};

/**
 * Build prompt for rewriting content
 */
export const buildRewritePrompt = (
    inputType: InputType,
    text: string,
    context: string
): string => {
    switch (inputType) {
        case 'help-request':
            return `Generate a professional description about ${context}. Write it as if you're the applicant describing your situation. Make it clear, compelling, and realistic.`;

        case 'content':
            return `Rewrite this text about ${context} in a different way while keeping it professional and the core message intact:\n\n"${text}"`;

        case 'irrelevant':
        case 'empty':
        default:
            return '';
    }
};

/**
 * Get AI suggestion with appropriate prompt
 */
export const getContextualSuggestion = async (
    userText: string,
    context: string
): Promise<{ type: 'guidance' | 'ai-generated'; content: string }> => {
    const inputType = categorizeInput(userText);

    // Handle irrelevant text with guidance
    if (inputType === 'irrelevant') {
        return {
            type: 'guidance',
            content: getGuidanceMessage(context)
        };
    }

    // Generate AI response for valid input
    const prompt = buildPrompt(inputType, userText, context);
    const aiText = await getAISuggestion(prompt);
    const trimmedContent = aiText.trim();

    // If AI somehow returned the help request back, try generating without the request text
    if (inputType === 'help-request' && isHelpRequest(trimmedContent)) {
        const freshPrompt = `Generate a clear, professional, and realistic description about ${context}. Write it as if you're the applicant describing your situation.`;
        const freshAiText = await getAISuggestion(freshPrompt);
        return {
            type: 'ai-generated',
            content: freshAiText.trim()
        };
    }

    return {
        type: 'ai-generated',
        content: trimmedContent
    };
};

/**
 * Get rewritten suggestion
 */
export const getRewrittenSuggestion = async (
    currentSuggestion: string,
    context: string
): Promise<{ type: 'guidance' | 'ai-generated'; content: string }> => {
    const inputType = categorizeInput(currentSuggestion);

    // Handle irrelevant text with guidance
    if (inputType === 'irrelevant') {
        return {
            type: 'guidance',
            content: getGuidanceMessage(context)
        };
    }

    // Generate AI rewrite for valid input
    const prompt = buildRewritePrompt(inputType, currentSuggestion, context);

    // If no prompt (shouldn't happen but safety check), return guidance
    if (!prompt) {
        return {
            type: 'guidance',
            content: getGuidanceMessage(context)
        };
    }

    const aiText = await getAISuggestion(prompt);

    return {
        type: 'ai-generated',
        content: aiText.trim()
    };
};
