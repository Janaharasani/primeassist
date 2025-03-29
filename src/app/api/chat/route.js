// app/api/chat/route.js
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "https://parking-app-smoky.vercel.app/",
    "X-Title":"parking-app",
  },
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: messages,
    });

    return new Response(JSON.stringify({ response: completion.choices[0].message }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Error processing your request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}