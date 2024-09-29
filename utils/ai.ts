import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'


  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const moodschema = {
    type: SchemaType.OBJECT,
    description: 'Analysis of a journal entry',
    properties: {
      sentimentScore: {
        type: SchemaType.NUMBER,
        description:
          'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      },

      mood: {
        type: SchemaType.STRING,
        description: 'the mood of the person who wrote the journal entry.',
      },

      summary: {
        type: SchemaType.STRING,
        description: 'quick summary of the entire entry.Keep it to couple of words',
      },

      subject: {
        type: SchemaType.STRING,
        description: 'the subject of the journal entry.',
      },

      negative: {
        type: SchemaType.STRING,
        description:
          'is the journal entry negative? (i.e. does it contain negative emotions?).',
      },

      color: {
        type: SchemaType.STRING,
        description:
          'provide a color that represents the mood of the entry in the form of a hexadecimal code. Example #0101fe for blue representing happiness. Make sure the code has only a single hash symbol as the first letter of the code',
      },
    },
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: moodschema,
    },
  })

  export const analyze = async (prompt) => {
    const input = await model.generateContent(prompt);
    console.log(input.response.text())
    const result = await JSON.parse(input.response.text()) ;
    // console.log(result)
    return result;
  } 
