create table if not exists task_lists (
    id int not null AUTO_INCREMENT,
    title varchar(255) not null,
    description text,
    updatedAt varchar(155) not null,
    primary key (id)
);