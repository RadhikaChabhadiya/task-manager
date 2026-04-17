import { TasksDashboard } from "@/components/tasks/TasksDashboard";
import { tasksApi } from "@/lib/api";

export const revalidate = 30;

export default async function TasksPage() {
    const initial = await tasksApi.list().catch(() => []);
    return <TasksDashboard initialTasks={initial} />;
}
