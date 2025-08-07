import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceI } from "../../types";

const initialState: WorkspaceI = {
    _id: "",
    name: "",
    description: "",
    visibility: "private",
    members: [],
    projects: [],
    teams: [],
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    settings: {
        theme: "dark",
        notifications: false,
    }
}

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        changeWorkspace: (state, action: PayloadAction<WorkspaceI>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { changeWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
