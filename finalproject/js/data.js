const DATA_URL = "../data/attractions.json";

export async function getAttractions() {
    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Unable to load attraction data:", error);
        throw error;
    }
}