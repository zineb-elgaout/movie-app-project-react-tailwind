

const API_URL = "https://localhost:7274/api/Contact"; 

export const sendContactForm = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to send message");
    }

    return await response.json(); 
  } catch (error) {
    throw error;
  }
};
