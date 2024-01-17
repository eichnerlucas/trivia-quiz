import { useUser } from "../contexts/userContext";

export default function Quiz() {
    const { username } = useUser();
    return (
        <div>
            <h1>Quiz</h1>
            <p>Username: {username}</p>
        </div>
    )
}