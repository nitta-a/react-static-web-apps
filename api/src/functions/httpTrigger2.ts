import { Readable } from 'node:stream';
import type { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { app } from '@azure/functions';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import type { ChatCompletions, EventStream } from '@azure/openai';

export async function httpTrigger2(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const client = new OpenAIClient(
    process.env.AZURE_OPENAI_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
  );

  const events = await client.streamChatCompletions(
    'gpt-35-turbo-0613',
    // 'gpt-4',
    [
      { role: 'system', content: 'You are an AI assistant that helps people find information.' },
      { role: 'user', content: 'Azure Functions について分かりやすく説明してください' },
    ],
    { maxTokens: 1024 }
  );

  const generator = async function* (events: EventStream<ChatCompletions>) {
    for await (const event of events) {
      for (const choice of event.choices) {
        if (choice.delta?.content === undefined) {
          continue;
        }
        console.log(choice.delta?.content);
        yield `event: text\ndata: ${choice.delta?.content}\n\n`;
      }
    }
  };

  const stream = Readable.from(generator(events));

  return {
    body: stream,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
    },
  };
}

app.http('httpTrigger2', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: httpTrigger2,
});
