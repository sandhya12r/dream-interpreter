'use client'
import React, { useRef, useState } from 'react';
import model from '@/app/geminiAi/geminiAi';
import { analyseDream } from '@/app/lib/action/AnalyseDream';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Dream() {
    const genAi = new GoogleGenerativeAI('AIzaSyCbge2L8It55W1nMHIInMsgfNkPvVhhq54');
    const model = genAi.getGenerativeModel({ model: "gemini-pro" });
    const [analysis, setAnalysis] = useState([]);
    const refDream = useRef(null);
    const radio = useRef(null);

    async function analyseDream(dreamString: string) {

        console.log('analysing dream plase wait');
        const bodyContent = generateBodyContent(dreamString);

        const result = await model.generateContent(bodyContent);
        const analysisString = refactorString(result.response.text());
        console.log(analysisString);
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
                <div className='flex flex-row gap-4'>
                    <label className='checkbox'>
                        <input className='form-checkbox' type="checkbox" name="sleep-quality" id="" />
                        <span>Slept Well</span>
                    </label>
                    <label className='checkbox'>
                        <input className='form-checkbox' type="checkbox" name="sleep-quality" id="" />
                        <span>Didn't sleep well</span>
                    </label>
                </div>
                <button className='btn btn-primary' onClick={() => analyseDream(refDream.current?.value)}>Interpret dream</button>
            </div>
            {
                analysis.length && (
                    <div className='mx-auto flex flex-col gap-5 my-3'>
                        {analysis.map((item) => <p>{item}</p>)}
                    </div>
                )
            }
        </>
    )
}

export default Dream