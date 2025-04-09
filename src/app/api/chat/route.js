import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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", // Replace with your API key
  defaultHeaders: {
    "HTTP-Referer": "https://parking-app-smoky.vercel.app/",
    "X-Title":"parking-app",
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


