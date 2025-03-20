import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import tasksSlice from "./slices/tasksSlice";
import projectsSlice from "./slices/projectsSlice";
import employeesSlice from "./slices/employeesSlice";
import rolesSlice from "./slices/rolesSlice";
import supervisorsSlice from "./slices/supervisorsSlice";
import reportsSlice from "./slices/reportsSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        projects: projectsSlice,
        tasks: tasksSlice,
        employees: employeesSlice,
        roles: rolesSlice,
        supervisors: supervisorsSlice,
        reports: reportsSlice,
    }
})