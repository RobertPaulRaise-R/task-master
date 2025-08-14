export interface TaskI {
    _id: string;
    name: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "high" | "medium" | "low";
    dueDate: string;
    projectId: {
        _id: string;
        name: string;
    };
    assignedTo: {
        _id: string;
        name: string;
    };
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChatI {
    _id: string;
    name?: string;
    participants: string[];
    type: "direct" | "group" | "team";
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface MessageI {
    _id: string;
    chatId: string;
    senderId: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
    attachments?: string[];
}


export interface ProjectI {
    _id: string;
    workspaceId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "on_hold" | "cancelled";
    createdBy: { _id: string; name: string };
    createdAt: string;
    updatedAt: string;
}

export interface TeamI {
    _id: string;
    createdAt: string;
    createdBy: string;
    members: [];
    name: string;
    project: string;
    tasks: [];
    updatedAt: string;
}

export interface UserI {
    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    avatar?: string;
    position: string;
    settings?: {
        theme: "light" | "dark";
        notifications: boolean;
    };
    createdAt: string;
    updatedAt: string;
}

export interface WorkspaceI {
    _id: string;
    name: string;
    description?: string;
    visibility: 'public' | 'private';
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    settings?: {
        theme?: 'light' | 'dark';
        notifications?: boolean;
    };
}
