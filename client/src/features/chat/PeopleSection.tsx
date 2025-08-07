import { persons } from "../../data";
import SearchBar from "../../ui/SearchBar";
import ChatPeople from "./ChatPeople";

export interface PersonType {
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    img: string;
}

function PeopleSection() {
    return (
        <div className="col-span-3 hidden md:block">
            <SearchBar label="search team or people" />

            {persons.map((person) => (
                <ChatPeople person={person} />
            ))}
        </div>
    );
}

export default PeopleSection;
