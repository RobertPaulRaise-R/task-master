import { useState } from "react";
import { WorkspaceI } from "../types";
import { RiExpandUpDownFill } from "react-icons/ri";

function WorkspaceSelector({ workspace, workspaces, setWorkspace} : { workspace: string; workspaces: WorkspaceI[] | undefined; setWorkspace: (value: string) => void}) {
    const [showWorkspace, setShowWorkspace] = useState<boolean>();

    return (
        <div>
            <div onClick={() => setShowWorkspace((show) => !show)}>
                {workspace}
                <RiExpandUpDownFill />
            </div>

            {
                showWorkspace && workspaces && workspaces.length > 0 ? (
                    <div>
                        {workspaces.map((w: WorkspaceI, i: number) => (
                            <span key={i} onClick={() => setWorkspace(w.name)}>{w.name}</span>
                        ))  
                        }
                    </div>
                ) : null
            }
        </div>
    );
}

export default WorkspaceSelector;
