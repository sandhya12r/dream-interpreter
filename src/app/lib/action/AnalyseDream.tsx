'use server';
'use strict';
import model from "@/app/geminiAi/geminiAi";

export async function analyseDream(formData: FormData) {
    const bodyContent = generateBodyContent(formData);

    const result = await model.generateContent(bodyContent);

    console.log(result.response.text());
}

const generateBodyContent = (FormData: FormData) => {
    return 'Hi, please analyse my dream: ' + FormData.get('dream');
}