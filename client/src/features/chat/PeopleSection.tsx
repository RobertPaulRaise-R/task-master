import { persons } from "../../data";
import SearchBar from "../../ui/SearchBar";
import People from "./People";

export interface PersonType {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  img: string;
}

function PeopleSection() {
  return (
    <div className="col-span-3">
      <SearchBar label="search team or people" />

      {persons.map((person) => (
        <People person={person} />
      ))}
    </div>
  );
}

export default PeopleSection;
