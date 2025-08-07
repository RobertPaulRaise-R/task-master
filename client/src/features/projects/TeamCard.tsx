import { TeamI } from "../../types";
import Button from "../../ui/Button";
import ListSection from "../dashboard/ListSection";

function TeamCard({ team }: { team: TeamI }) {
    return (
        <ListSection>
            <ListSection.Header label={team.name}></ListSection.Header>

            <>
                {team.members.length > 0 ? (
                    team.members.map((member: { name: string; avatar: string }, i) => (
                        <p className="border-light-300 mx-6 mb-4 border p-4" key={i}>
                            {member.name}
                        </p>
                    ))
                ) : (
                    <p className="border-light-300 mx-6 mb-4 border p-4">No members</p>
                )}
                <Button btn="primary" className="mx-6 mb-4 p-4">Add Member</Button>
            </>
        </ListSection>
    );
}

export default TeamCard;
