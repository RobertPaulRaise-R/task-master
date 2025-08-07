import { UserI } from "../../types"

function PeopleListView({ person }: { person: UserI }) {
    return (
        <div>
            <img src={person.avatar} />
            <p>{person.name}</p>
            <p>{person.email}</p>
        </div>
    );
}

export default PeopleListView;
