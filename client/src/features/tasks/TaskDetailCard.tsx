import { GoPerson } from "react-icons/go";
import { MdModeEdit, MdOutlineCancel } from "react-icons/md";
import { TaskI, UserI } from "../../types";
import Col from "../../ui/Col";
import IconButton from "../../ui/IconButton";
import Label from "../../ui/Label";
import Row from "../../ui/Row";
import Status from "../../ui/Status";
import Priority from "./Priority";
import { FaRegCalendarAlt, FaSave } from "react-icons/fa";
import { getDate } from "../../utils/getDate";
import { Link } from "react-router";
import { useState } from "react";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import SelectMember from "../../ui/SelectMember";
import { useWorkspaceMembers } from "../../api/queries/useWorkspaceMembers";
import { useUpdateTaskMutation } from "../../api/mutations/useUpdateTaskMutation";

function TaskDetailCard({ task }: { task: TaskI }) {
    const { register, handleSubmit } = useForm<{
        _id: string;
        name?: string;
        description?: string;
        status?: string;
        priority?: string;
        dueDate?: string;
        assignedTo?: string;
    }>();

    const { members, isPending, isError } = useWorkspaceMembers();
    const { mutate } = useUpdateTaskMutation();

    const [member, setMember] = useState<UserI>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const dueDate = getDate(task.dueDate);
    const createdDate = getDate(task.createdAt);

    const onSubmit = (data: {
        _id: string;
        name?: string;
        description?: string;
        status?: string;
        priority?: string;
        dueDate?: string;
        assignedTo?: string;
    }) => {
        mutate({ ...data, assignedTo: member?._id, _id: task._id });
    };

    if (isPending) return <p>Loading members</p>
    if (isError) return <p>Error fetching workspace members</p>

    return (
        <div className="p-4">
            <div className="flex items-center justify-between gap-4">
                {
                    isEditing ? <Input width="w-full" {...register("name", { value: task.name, required: true })} type="text" /> :
                        <h3 className="text-xl font-semibold line-clamp-2">{task.name}</h3>
                }

                {
                    isEditing ?
                        <div className="flex gap-2">
                            <IconButton onClick={handleSubmit(onSubmit)}>
                                <FaSave size={20} />
                            </IconButton>
                            <IconButton onClick={() => setIsEditing(false)}>
                                <MdOutlineCancel size={20} />
                            </IconButton>
                        </div> :
                        <IconButton onClick={() => setIsEditing(true)}>
                            <MdModeEdit />
                        </IconButton>
                }
            </div>

            <div className="space-y-6">
                <div>
                    <Col>
                        <Label label="Status: " />
                        <Status status={task.status} />
                    </Col>

                    <Col>
                        <Label label="Priority: " />
                        <Priority priority={task.priority} />
                    </Col>
                </div>

                <Row>
                    <Label label="Description" />
                    {isEditing ? <textarea className="outline-none border dark:border-neutral-700 rounded-lg px-3 py-2"{...register("description", { value: task.description, required: true })}></textarea> :
                        <p>{task.description}</p>
                    }
                </Row>

                <div className="grid grid-cols-2 gap-y-4">
                    <Row>
                        <Label label={
                            <>
                                <GoPerson />
                                <span>Assigned To</span>
                            </>
                        } />

                        {isEditing ? <SelectMember options={members} value={member} setValue={setMember} width="w-[200px]" /> :
                            (<div className="flex items-center gap-2">
                                <span className="inline-flex items-center justify-center size-8 bg-light-400 rounded-full p-2">{task.assignedTo.name[0]}</span>
                                <span>{task.assignedTo.name}</span>
                            </div>
                            )
                        }
                    </Row>

                    <Row>
                        <Label label={
                            <>
                                <FaRegCalendarAlt />
                                <span>Due Date</span>
                            </>
                        } />
                        {isEditing ? <Input type="date" {...register("dueDate", { value: dueDate, required: true })} /> :

                            <span>{dueDate}</span>
                        }
                    </Row>

                    <Row>
                        <Label label={
                            <>
                                <FaRegCalendarAlt />
                                <span>Project</span>
                            </>
                        } />
                        <Link to={`/app/projects/${task.projectId._id}`}>{task.projectId.name}</Link>
                    </Row>

                    <Row>
                        <Label label={
                            <>
                                <FaRegCalendarAlt />
                                <span>Created</span>
                            </>
                        } />
                        <span>{createdDate}</span>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailCard;
