import React, {useEffect, useState} from 'react';
import Quiz from "./quiz";

export default function Start() {
    const [ username, setUsername ] = useState('');
    const [ selectedCategory, setSelectedCategory ]= useState('');
    const [ difficulty, setDifficulty ] = useState('easy');
    const [categories, setCategories] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isValid = Boolean(username && difficulty && selectedCategory);

    const handleClick = (evt) => {
        if (!isValid) {
            return evt.preventDefault();
        }

        setIsButtonClicked(true)
    }

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.trivia_categories);
                setSelectedCategory(data.trivia_categories[0].id);
                setIsLoading(false);
            });
    }, []);

    return (
        isButtonClicked
            ? <Quiz username={username} selectedCategory={selectedCategory} difficulty={difficulty}/>
            : (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full flex justify-center">
                <img src={"./img/logo.png"} alt={"Trivia Quiz"}/>
            </div>

            <div className="lg:w-1/6 md:w-1/3 sm:w-full">
            <input
                    className="w-full m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500 placeholder-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                { isLoading ?
                    <select disabled className="w-full m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer">
                        <option>Loading...</option>
                    </select>
                    :
                    <select
                        className="w-full m-1 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                }

                <select
                    className="w-full m-1 py-2 text-center font-semibold rounded-lg shadow-md text-white bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option key="1" value="easy">Easy</option>
                    <option key="2" value="medium">Medium</option>
                    <option key="3" value="hard">Hard</option>
                </select>
            </div>

            <div className="w-full flex justify-center">
                <a
                    className={`w-2/8 m-2 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white 
          bg-amber-600 hover:bg-amber-500 focus:outline-none focus:border-transparent`}
                    href="/"
                >
                    Back
                </a>

                <a
                    className={`w-2/8 m-2 py-2 px-4 text-center font-semibold rounded-lg shadow-md text-white 
          ${isValid ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gray-700 cursor-not-allowed'} 
          focus:outline-none focus:border-transparent`}
                    onClick={handleClick}
                >
                    Go!
                </a>
            </div>
        </div>
            )
    );
}