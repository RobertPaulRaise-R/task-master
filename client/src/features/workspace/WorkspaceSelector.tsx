import { useCallback, useState } from "react";
import { WorkspaceI } from "../../types";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalView from "../../ui/ModalView";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { changeWorkspace } from "./workspaceSlice";
import { createWorkspace } from "../../api/services/worksapceApi";
import Row from "../../ui/Row";

function WorkspaceSelector({ workspace, workspaces, setWorkspace }: { workspace: WorkspaceI | null; workspaces: WorkspaceI[] | undefined; setWorkspace: (value: WorkspaceI) => void }) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [showWorkspace, setShowWorkspace] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [optionsValue, setOptionsValue] = useState<string>("private");

    const { register, handleSubmit } = useForm<{
        name: string;
        description: string;
    }>();

    const createWorkspaceMutation = useMutation({
        mutationFn: createWorkspace,
        onSuccess: () => {
            setShowForm(false);
            setShowWorkspace(false);
        },
        onError: () => {
            console.log("Error in creating workspace");
        }
    });

    const handleChangeWorkspace = useCallback((workspace: WorkspaceI) => {
        dispatch(changeWorkspace(workspace));
        queryClient.invalidateQueries();
    }, [dispatch, queryClient]);

    const onSubmit = (data: {
        name: string;
        description: string;
    }) => {
        createWorkspaceMutation.mutate({
            name: data.name,
            description: data.description,
            visibility: optionsValue,
        });
    };

    return (
        <div className="relative w-[250px]">
            <div
                className="bg-light-300 dark:bg-neutral-900 hover:bg-light-400 dark:hover:bg-neutral-800 px-2 py-3 flex items-center justify-between rounded-lg"
                onClick={() => setShowWorkspace((show) => !show)}>
                <span className="overflow-hidden line-clamp-1">
                    {workspace?.name}
                </span>
                <RiExpandUpDownFill />
            </div>

            {
                showWorkspace && workspaces && workspaces.length > 0 ? (
                    <div className="absolute bg-light-300 dark:bg-neutral-900 mt-2 rounded-lg w-full flex flex-col items-center">
                        {workspaces.map((w: WorkspaceI, i: number) => (
                            <span
                                key={i}
                                onClick={() => {
                                    setWorkspace(w)
                                    handleChangeWorkspace(w)
                                    setShowWorkspace(false)
                                }}
                                className="inline-block px-2 py-3 hover:bg-light-400 dark:hover:bg-neutral-800 w-full text-center rounded-lg"
                            >
                                {w.name}
                            </span>
                        ))
                        }
                        <span
                            onClick={() => {
                                setShowForm(true)
                                setShowWorkspace(false)
                            }}
                            className="inline-block px-2 py-3 hover:bg-light-400 dark:hover:bg-neutral-700 w-full text-center rounded-lg">
                            New Workspace
                        </span>
                    </div>
                ) : null
            }

            <ModalView
                title="Create New Workspace"
                isOpen={showForm}
                onClose={() => setShowForm((show) => !show)}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <Row>
                        <Label label="Workspace Name" />
                        <Input
                            {...register("name", { required: true })}
                            placeholder="Enter workspace name"
                        />
                    </Row>

                    <Row>
                        <Label label="Visibility" />
                        <Select options={["public", "private"]} value={optionsValue} setValue={setOptionsValue} />
                    </Row>

                    <Row>
                        <Label label="Workspace Description" />
                        <Input
                            {...register("description", { required: true })}
                            placeholder="Enter workspace description"
                        />
                    </Row>


                    <div className="flex items-center justify-end gap-3">
                        <Button btn="secondary" >
                            Cancel
                        </Button>
                        <Button type="submit" btn="primary">
                            Create
                        </Button>
                    </div>
                </form>
            </ModalView>
        </div>
    );
}

export default WorkspaceSelector;
