import Button from "./components/button";

export default function App() {
    return (
        <main className="h-screen">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-2/3 md:w-2/6 lg:w-1/6 xl:w-1/6">

                    <div className={"py-2 px-4 text-3xl text-center text-white font-sans font-bold"}>Trivia Quiz</div>
                </div>
                <Button
                    className={"lg:w-1/6 md:w-1/3 sm:w-full m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500"}
                    link={"/start"} text={"Start"}/>
                <Button
                    className={"lg:w-1/6 md:w-1/3 sm:w-full m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500"}
                    link={"/scoreboard"} text={"Scoreboard"}/>
                <a
                    className={"lg:w-1/6 md:w-1/3 sm:w-full m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500"}
                    href={"https://discord.gg/u9kRxTBAd2"} target="_blank" rel="noreferrer noopener">
                    Discord
                </a>
            </div>
        </main>
    )
}