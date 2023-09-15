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
              content: `Dans ce contexte: 
              ${bio}${bio.slice(-1) === '.' ? '' : '.'}.
              Générez 2 chansons qui évoque ${vibe} clairement étiquetées "1." et "2.".
 
                Assurez-vous que la chanson suive la structure suivante.

                TITRE: Le hook principale de la chanson

                Couplet1 : Quel est le problème, la tension ou le conflit dans cette chanson ? Comment cela définit-il le TITRE ?

                Refrain: Reprend le TITRE avec des mots simples

                Couplet 2: Quelle est l'escalade du problème,
                tension ou conflit ? Quelle est la conséquence de la première
                problème? configurer le TITRE à partir d'un
                angle différent.

                Refrain

                Couplet 3: Quelle est l’escalade finale du conflit ?
                Quelle est une autre façon de penser à cela ?
                Si les sections précédentes étaient au passé,
                quel est le moment présent ? En quoi est-ce différent
                que le passé ?
                Comment cela configure-t-il le TITRE qui est différent
                des sections 1 et 2 ?

                Refrain
          `,
          },
      ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
