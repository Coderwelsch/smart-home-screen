import { TodoistApi } from "@doist/todoist-api-typescript"


export const todoistClient = new TodoistApi(process.env.REACT_APP_TODOIST_API_KEY as string)