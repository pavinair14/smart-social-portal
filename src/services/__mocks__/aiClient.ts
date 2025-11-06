export async function getAISuggestion(prompt: string): Promise<string> {
    // Mock used in Jest tests to avoid OpenAI API calls and import.meta.env issues
    return `Mocked suggestion for: ${prompt}`;
}
