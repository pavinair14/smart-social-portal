/**
 * Text analysis utilities for detecting user intent and text types
 */

/**
 * Detect if text is a help request
 */
export const isHelpRequest = (text: string): boolean => {
    const lower = text.toLowerCase();
    const helpPatterns = [
        /\b(help|assist|aid)\b.*\b(writ|prepar|creat|draft|generat|compos|make)/i,
        /\b(need|require|want|can you|could you|would you)\b.*\b(help|writ|prepar|creat|draft)/i,
        /\b(writ|prepar|creat|draft|generat|compos)\b.*\b(for me|statement|description)/i,
        /\bhow (do i|can i|to)\b.*\b(writ|describ)/i
    ];
    return helpPatterns.some(pattern => pattern.test(lower));
};

/**
 * Detect if text is irrelevant (greetings, chat, unrelated)
 */
export const isIrrelevantText = (text: string): boolean => {
    if (text.length < 10) return true;

    const lower = text.toLowerCase().trim();
    const words = lower.split(/\s+/);

    // Common greetings
    const greetings = ["hi", "hello", "hey", "hii", "helo", "sup", "yo"];
    if (greetings.includes(words[0])) return true;

    // Chat phrases
    const chatPhrases = [
        "how are you", "how r u", "what's up", "whats up", "wassup",
        "good morning", "good afternoon", "good evening",
        "how's it going", "how is it going", "how you doing"
    ];
    if (chatPhrases.some(phrase => lower.includes(phrase))) return true;

    return false;
};

/**
 * Determine the type of user input
 */
export type InputType = 'empty' | 'irrelevant' | 'help-request' | 'content';

export const categorizeInput = (text: string): InputType => {
    const trimmed = text.trim();

    if (trimmed.length === 0) return 'empty';
    if (isIrrelevantText(trimmed)) return 'irrelevant';
    if (isHelpRequest(trimmed)) return 'help-request';

    return 'content';
};
