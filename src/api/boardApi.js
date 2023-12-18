async function getBoardData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export { getBoardData };
