import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { vibe, bio } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
          {
              role: 'user',
              content: `Generate 2 ${vibe} Song Lyrics and clearly labeled "1." and "2.". ${
                  vibe === 'Rap'
                      ? 'Make sure the lyrics include references to the rap culture'
                      : null
              }

          Make sure each generated lyrics have a structure of Chorus, Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus, and base them on this context: ${bio}${
                  bio.slice(-1) === '.' ? '' : '.'
              }`,
          },
      ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
