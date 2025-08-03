import {useState, useMemo, useEffect, useRef} from "react";
import ImageCard from "./components/ImageCard.jsx";

function App() {
    const locationAssets = 'http://' + location.host + '/assets/';

    const [selectedCards, setSelectedCards] = useState([]);
    const [couplePoints, setCouplePoints] = useState(0);
    const [timer, setTimer] = useState(120);
    const timerRef = useRef(null);
    const audioRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);

    const [finalScore, setFinalScore] = useState(0);

    useEffect(() => {
        if (gameStarted){
            timerRef.current = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [gameStarted]);

    const COUPLE_LIMIT = 12;

    useEffect(() => {
        if (couplePoints === COUPLE_LIMIT && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            console.log("Timer dihentikan karena poin mencapai 4!");

            const maxTime = 120;
            const score = Math.max(0, Math.round((timer / maxTime) * 100));
            setFinalScore(score);
            setGameStarted(false);
        }
    }, [couplePoints]);

    const songs = [
        'wave to earth - love.mp3',
        'The Walters - I Love You So.mp3'
    ]

    const selectedSong = useMemo(() => {
        const index = Math.floor(Math.random() * songs.length);
        return songs[index];
    }, []);

    const characters = [
        { name: 'Arima Kousei', image: locationAssets + 'Arima Kousei.jpg', couple_id: 0 },
        { name: 'Kaori', image: locationAssets + 'Kaori.jpg', couple_id: 0 },
        { name: 'Kirito', image: locationAssets + 'Kirito.jpg', couple_id: 1 },
        { name: 'Asuna', image: locationAssets + 'Asuna.jpg', couple_id: 1 },
        { name: 'Miyuki', image: locationAssets + 'Miyuki.jpg', couple_id: 2 },
        { name: 'Kaguya', image: locationAssets + 'Kaguya.jpg', couple_id: 2 },
        { name: 'Ishida', image: locationAssets + 'Ishida.jpg', couple_id: 3 },
        { name: 'Nishimiya', image: locationAssets + 'Nishimiya.jpg', couple_id: 3 },
        { name: 'Taki', image: locationAssets + 'taki.jpg', couple_id: 4 },
        { name: 'Mitsuha', image: locationAssets + 'mitsuha.jpg', couple_id: 4 },
        { name: 'Inuyasha', image: locationAssets + 'Inuyasha.jpg', couple_id: 5 },
        { name: 'Kagome', image: locationAssets + 'Kagome.jpg', couple_id: 5 },
        { name: 'Miyamura', image: locationAssets + 'Miyamura.jpg', couple_id: 6 },
        { name: 'Horimiya', image: locationAssets + 'Horimiya.jpg', couple_id: 6 },
        { name: 'Yamada', image: locationAssets + 'Yamada.jpg', couple_id: 7 },
        { name: 'Akane', image: locationAssets + 'Akane.jpg', couple_id: 7 },
        { name: 'Okabe', image: locationAssets + 'Okabe.jpg', couple_id: 8 },
        { name: 'Makise', image: locationAssets + 'Makise.jpg', couple_id: 8 },
        { name: 'Loid', image: locationAssets + 'Loid.jpg', couple_id: 9 },
        { name: 'Yor', image: locationAssets + 'Yor.jpg', couple_id: 9 },
        { name: 'Kazuki', image: locationAssets + 'Kazuki.jpg', couple_id: 10 },
        { name: 'Anzu', image: locationAssets + 'Anzu.jpg', couple_id: 10 },
        { name: 'Tarou', image: locationAssets + 'Tarou.jpg', couple_id: 11 },
        { name: 'Koyanagi', image: locationAssets + 'Koyanagi.jpg', couple_id: 11 },
        { name: 'Hirotaka', image: locationAssets + 'Hirotaka.jpg', couple_id: 12 },
        { name: 'Momose', image: locationAssets + 'Momose.jpg', couple_id: 12 },
        { name: 'Rintarou', image: locationAssets + 'Rintarou.jpg', couple_id: 13 },
        { name: 'Waguri', image: locationAssets + 'Waguri.jpg', couple_id: 13 },
        { name: 'Ken', image: locationAssets + 'Ken.jpg', couple_id: 14 },
        { name: 'Ayase', image: locationAssets + 'Ayase.jpg', couple_id: 14 },
    ];

    const shuffled = useMemo(() => {
        // 1. Ambil pasangan unik
        const coupleIds = [...new Set(characters.map(c => c.couple_id))];

        // 2. Shuffle pasangan
        for (let i = coupleIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coupleIds[i], coupleIds[j]] = [coupleIds[j], coupleIds[i]];
        }

        // 3. Ambil 12 pasangan acak
        const selectedCoupleIds = coupleIds.slice(0, COUPLE_LIMIT);

        // 4. Ambil semua karakter dari pasangan terpilih
        const selectedCharacters = characters.filter(c =>
            selectedCoupleIds.includes(c.couple_id)
        );

        // 5. Fisher-Yates Shuffle karakter
        for (let i = selectedCharacters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selectedCharacters[i], selectedCharacters[j]] = [
                selectedCharacters[j],
                selectedCharacters[i],
            ];
        }

        return selectedCharacters;
    }, []);



    useEffect(() => {
        if (selectedCards.length !== 2) return;

        if (selectedCards[0] === selectedCards[1]) {
            setCouplePoints(prev => prev + 1);
        }
    }, [selectedCards]);

    const handleStart =() => {
        // Mulai musik
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // (opsional) set volume
            audioRef.current.play().catch(e => {
                console.warn("Autoplay diblokir browser:", e);
            });
        }
        setGameStarted(true);
    }

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row p-4 gap-4 bg-rose-200">
            <div className="w-full md:w-1/4 bg-rose-100 rounded-2xl shadow-lg p-6 flex flex-col gap-6">
                <h1 className="text-3xl font-extrabold text-center text-rose-800">My Kisah 💖</h1>
                <button
                    onClick={handleStart}
                    disabled={gameStarted}
                    className={`px-4 py-2 text-white font-semibold rounded-lg transition ${
                        gameStarted
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-rose-500 hover:bg-rose-600'
                    }`}
                >
                    {gameStarted ? 'Game Dimulai' : 'Start Game'}
                </button>
                <div className="text-lg font-medium text-rose-800 space-y-2">
                    <p>⏱️ Timer: <span className="font-bold">{timer}</span> detik</p>
                    <p>⭐ Score (Couples): <span className="font-bold">{couplePoints}</span></p>
                    <p>🏁 Final Score: <span className="font-bold">{finalScore}</span></p>
                </div>


                {/* MP3 Player */}
                <div className="mt-auto">
                    <p className="text-rose-600 font-semibold mb-1">🎵 Theme Song</p>
                    <audio ref={audioRef} controls className="w-full">
                        <source src={`/audio/${selectedSong}`} type="audio/mpeg" />
                        Browser kamu tidak mendukung audio player.
                    </audio>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4 w-full p-2">
                {shuffled.map((char) => (
                    <ImageCard
                        key={char.name}
                        data={char}
                        setSelectedCards={setSelectedCards}
                        selectedCards={selectedCards}
                        gameStarted={gameStarted}
                    />
                ))}
            </div>

        </div>

    );
}

export default App;
