use task_management;

create table tasks_task_lists (
    taskId int,
    taskListId int,
    primary key (taskId, taskListId),
    constraint tasks_task_lists_task_lists_id_fk foreign key (taskListId) references task_lists (id),
    constraint tasks_task_lists_tasks_id_fk foreign key (taskId) references tasks (id)
);