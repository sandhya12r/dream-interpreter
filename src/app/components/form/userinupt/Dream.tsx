'use client'
import React, { useRef, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Dream() {
    const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || '');
    const model = genAi.getGenerativeModel({ model: "gemini-pro" });
    const [analysis, setAnalysis] = useState<string[]>([]);
    const refDream = useRef<HTMLTextAreaElement>(null);

    async function analyseDream(dreamString: string) {

        const bodyContent = generateBodyContent(dreamString);

        const result = await model.generateContent(bodyContent);
        const analysisString = refactorString(result.response.text());
        setAnalysis(analysisString);

    }

    const generateBodyContent = (dreamString: string) => {
        return 'Hi, please analyse my dream: ' + dreamString;
    }

    const refactorString = (string: string) => {
        return string.split('**');
    }

    return (
        <>
            <div className='max-w-96 mx-auto flex flex-col gap-5 my-3'>
                <label className='text required'>
                    <span>Describe your dream</span>
                    <textarea className='form-input' name='dream' placeholder="Describe your dream, including the main actions and symbols, everything that matters in your opinion..." rows={5} required ref={refDream} />
                </label>
               
                <button className='btn btn-primary' onClick={() => analyseDream((refDream.current as HTMLTextAreaElement)?.value)}>Interpret dream</button>  </div>
            {
                analysis.length && (
                    <div className='mx-auto flex flex-col gap-5 my-3'>
                        {analysis.map((item) => <p key={item}>{item}</p>)}
                    </div>
                )
            }
        </>
    )
}

export default Dream