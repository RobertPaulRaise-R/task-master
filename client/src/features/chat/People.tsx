import { useContext } from "react";
import { PersonType } from "./PeopleSection";
import { ChatContext } from "../../pages/Chat";

function People({ person }: { person: PersonType }) {
  const { setShowChat } = useContext(ChatContext);
  return (
    <div className="border-light-300 mt-2 flex gap-2 rounded-lg border p-2">
      {person.img ? (
        <img src="" alt="" />
      ) : (
        <div className="bg-light-100 border-light-300 flex h-14 w-16 items-center justify-center rounded-full border">
          <span className="text-brand-500 text-xl font-bold">
            {person.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="flex w-full cursor-pointer flex-col justify-evenly">
        <div className="flex justify-between">
          <span className="font-semibold">{person.name}</span>
          <span className="text-light-600 text-sm">10:32</span>
        </div>

        <span className="text-light-700">{person.lastMessage}</span>
      </div>
    </div>
  );
}

export default People;
