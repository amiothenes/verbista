async function fetchTexts() {
    try {
        const response = await fetch('API_ENDPOINT');
        if (!response.ok) {
            throw new Error('Failed to fetch texts');
        }
        const data = await response.json();
        // return data;
        return ['Text 1', 'Text 2', 'Text 3'];
    } catch (error) {
        console.error(error);
        // Handle error gracefully
        // return ['Error fetching texts'];
        return ['Text 1', 'Text 2', 'Text 3'];

    }
}

export default fetchTexts;
