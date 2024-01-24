export default function GameFinished({ username, score }) {
    const scoreMessage = score.correct > score.incorrect ? '😊 Congratulations!' : '😞 Better luck next time,';

    return (
        <div className="flex flex-col items-center bg-gray-800 min-w-96 overflow-auto p-6 mt-4 rounded-md shadow-sm">
            <h1 className="p-1 text-xl text-white font-bold">{scoreMessage} {username}!</h1>
            <h2 className="p-1 text-white font-bold ">Your score is {score.correct} out of {score.correct + score.incorrect}</h2>
            <button
                className="m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer"
                onClick={() => window.location.reload()}
            >
                Play Again
            </button>
        </div>
    )
}