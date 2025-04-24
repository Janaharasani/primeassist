import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_REFERER,
    "X-Title": process.env.OPENROUTER_TITLE,
  },
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    console.log("Sending request to OpenAI with messages:", messages); // Debugging log

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free", // Using Llama 4 Maverick model
      messages: messages,
    }).catch(error => {
      console.error("Error during completion request:", error); // Log if error occurs during API request
      throw error; // Rethrow error for further handling
    });

    console.log("Received response:", completion); // Debugging log

    return new Response(JSON.stringify({ response: completion.choices[0].message }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in POST request:', error); // General error logging
    return new Response(JSON.stringify({ error: 'Error processing your request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


