export const updateDifficulty = async (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
  try {
    const response = await fetch('http://localhost:5000/api/difficulty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty }),
    });

    if (!response.ok) {
      throw new Error('Failed to update difficulty');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating difficulty:', error);
    throw error;
  }
};