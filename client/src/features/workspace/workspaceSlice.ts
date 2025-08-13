import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceI } from "../../types";

const defaultState: WorkspaceI = {
    _id: "",
    name: "",
    description: "",
    visibility: "private",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    settings: {
        theme: "dark",
        notifications: false,
    }
}

const storedWorkspace = localStorage.getItem("workspace");
const initialState = storedWorkspace ? JSON.parse(storedWorkspace) : defaultState;

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        changeWorkspace: (state, action: PayloadAction<WorkspaceI>) => {
            const workspace = JSON.stringify({ ...state, ...action.payload });
            localStorage.setItem("workspace", workspace);
            return { ...state, ...action.payload };
        },
    }
});

export const { changeWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
