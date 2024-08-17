import {NextResponse} from 'next/server';

import OpenAI from 'openai';

const systemPrompt = `You are a flashcard creator.

Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines
1. Write flashcards that are concise and effective.
2. Include only relevant information.
3. Avoid redundancy.
4. Use bullet points to separate different flashcards.
5. Use simple language.
6. Use clear and concise headings for each flashcard.
7. Include key concepts and important details.
8. Use examples and illustrations to enhance understanding.
9. Organize flashcards in a logical and coherent manner.
10. Proofread and edit flashcards for accuracy and clarity.
11. When appropriate, use mnemoics or memory aids to help reinforce the information.
12. Aim to create a balanced set of flashcards that covers the topic comprehensively.
13. Only generate 10 flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format
{
    "flashcards": [
        {
        "front": str,
        "back": str
        },
    ]
    
    }
}
    
Remember, front must be a question and back must be a one/two word answer.
`;

export async function POST(req){
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
    })
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages : [
            {role: 'system', content: systemPrompt},
            {role: 'user',content: data}
        ],
        model: 'openai/gpt-4o-mini',
        response_format: {type: 'json_object'},
    })
    const flashcards= JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcards)

}


