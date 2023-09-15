'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { VibeType } from '../components/DropDown';
import Footer from '../components/Footer';
import Github from '../components/GitHub';
import Header from '../components/Header';
import { useChat } from 'ai/react';
import SquigglyLines from '../components/SquigglyLines';

export default function Page() {
    const [bio, setBio] = useState('');
    const [vibe, setVibe] = useState<VibeType>(
        'La beauté et la tranquillité de la nature.'
    );
    const bioRef = useRef<null | HTMLDivElement>(null);

    const scrollToBios = () => {
        if (bioRef.current !== null) {
            bioRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const { input, handleInputChange, handleSubmit, isLoading, messages } =
        useChat({
            body: {
                vibe,
                bio,
            },
            onResponse() {
                scrollToBios();
            },
        });

    const onSubmit = (e: any) => {
        setBio(input);
        handleSubmit(e);
    };

    const lastMessage = messages[messages.length - 1];
    const generatedBios =
        lastMessage?.role === 'assistant' ? lastMessage.content : null;

    function formatLyrics(rawLyrics: string) {
        if (!rawLyrics) {
            return;
        }
        const lines = rawLyrics
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line);
        let currentSection = null;

        const lyrics = {
            title: lines[0].replace('TITRE: ', ''),
            sections: [],
        };

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];

            // Check if the line is a section name (e.g., "Couplet 1:")
            if (line.endsWith(':')) {
                if (currentSection) {
                    lyrics.sections.push(currentSection);
                }
                currentSection = {
                    name: line.replace(':', ''),
                    lines: [],
                };
            } else {
                // Otherwise, treat the line as a lyric line
                if (currentSection) {
                    currentSection.lines.push(line);
                }
            }
        }
        if (currentSection) {
            lyrics.sections.push(currentSection);
        }
        return lyrics;
    }

    const lyrics = formatLyrics(generatedBios);

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
                <Image
                    alt="Man with a guitar"
                    src="/background.png"
                    className="rounded-2xl mb-6"
                    width={400}
                    height={400}
                />
                <a
                    className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
                    href="https://github.com/memamet/ecris-moi-une-chanson"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github />
                    <p>Étoile sur GitHub</p>
                </a>
                <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                    Générez les paroles de votre{' '}
                    <span className="relative whitespace-nowrap text-[#3290EE]">
                        <SquigglyLines />
                        <span className="relative">prochaine chanson </span>
                    </span>{' '}
                    avec GPT4
                </h1>
                <p className="text-slate-500 mt-5">
                    47 118 paroles générées jusqu'à présent.
                </p>
                <form className="max-w-xl w-full" onSubmit={onSubmit}>
                    <div className="flex mt-10 items-center space-x-3">
                        <Image
                            src="/1-black.png"
                            width={30}
                            height={30}
                            alt="1 icon"
                            className="mb-5 sm:mb-0"
                        />
                        <p className="text-left font-medium">
                            Où se situe votre chanson et de quoi voulez-vous
                            parler ?
                        </p>
                    </div>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                        placeholder={'Ex: Plage / Rugby / Montagne / Métro'}
                    />
                    <div className="flex mb-5 items-center space-x-3">
                        <Image
                            src="/2-black.png"
                            width={30}
                            height={30}
                            alt="1 icon"
                        />
                        <p className="text-left font-medium">
                            Sélectionnez votre intention
                        </p>
                    </div>
                    <div className="block">
                        <DropDown
                            vibe={vibe}
                            setVibe={(newVibe) => setVibe(newVibe)}
                        />
                    </div>

                    {!isLoading && (
                        <button
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                            type="submit">
                            Générez vos paroles &rarr;
                        </button>
                    )}
                    {isLoading && (
                        <button
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                            disabled>
                            <span className="loading">
                                <span style={{ backgroundColor: 'white' }} />
                                <span style={{ backgroundColor: 'white' }} />
                                <span style={{ backgroundColor: 'white' }} />
                            </span>
                        </button>
                    )}
                </form>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                />
                <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
                <output className="space-y-10 my-10">
                    {generatedBios && (
                        <>
                            <div>
                                <h2
                                    className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                                    ref={bioRef}>
                                    Vos paroles générées
                                </h2>
                            </div>
                            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                                <div
                                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            generatedBios
                                        );
                                        toast('Lyrics copied to clipboard', {
                                            icon: '✂️',
                                        });
                                    }}
                                    key={generatedBios}>
                                    <h1>TITRE: {lyrics.title}</h1>
                                    {lyrics.sections.map((section, idx) => (
                                        <div key={idx} className="section">
                                            <h2 className="text-left">
                                                {section.name}
                                            </h2>
                                            {section.lines.map(
                                                (line, lineIdx) => (
                                                    <p
                                                        className="text-left"
                                                        key={lineIdx}>
                                                        {line}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </output>
            </main>
            <Footer />
        </div>
    );
}
