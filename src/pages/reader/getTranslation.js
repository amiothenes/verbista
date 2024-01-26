export default async function getTranslation(word) {
    // try {
    //     const response = await fetch(`https://translation-api.com/api/v1/translate?word=${word}&target_language=en`);
    //     const data = await response.json();
    //     return data.translation;
    // } catch (error) {
    //     console.error('Error fetching translation:', error);
    //     return null;
    // }
    return `This is a translation of ${word}`;
}
