# **Database Schema**

## `users`

| column name | data type | details                         |
|-------------|-----------|---------------------------------|
| id                | integer   | not null, primary key     |
| firstName         | string    | not null,                 |
| lastName          | string    | not null,                 |
| username          | string    | not null, unique          |
| email             | string    | not null, indexed, unique |
| hashedPassword    | string    | not null,                 |
| created_at        | datetime  | not null                  |
| updated-at        | datetime  | not null                  |

## `lists`

| column name   | data type | details               |
|-------------  |-----------|-----------------------|
| id            | integer   | not null, primary key |
| name          | string    | not null              |
| numTasks      | integer   |                       |
| numCompleted  | integer   |                       |
| notes         | string    |                       |
| ownerId       | integer   | not null, foreign key |
| created_at    | datetime  | not null              |
| updated-at    | datetime  | not null              |

* `ownerId` references `users` table

## `tasks`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| name          | string    | not null              |
| completed     | boolean   | not null              |
| dueDate       | datetime  |                       |
| startDate     | datetime  |                       |
| priority      | integer   |                       |
| repeatPeriod  | integer   |                       |
| repeatType    | string    |                       |
| location      | string    |                       |
| estimate      | integer   |           default: 0  |
| tags          | string    |                       |
| notes         | string    |                       |
| listId        | integer   | foreign key           |
| ownerId       | integer   | not null, foreign key |
| assignedUser  | integer   | foreign key           |
| created_at    | datetime  | not null              |
| updated-at    | datetime  | not null              |

* `listId` references `lists` table
* `ownerId` references `users` table
* `assignedUser` references `users` table

## `subtasks`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| name          | string    | not null              |
| completed     | boolean   | not null              |
| dueDate       | datetime  |                       |
| startDate     | datetime  |                       |
| priority      | integer   |                       |
| repeatPeriod  | integer   |                       |
| repeatType    | string    |                       |
| location      | string    |                       |
| estimate      | integer   |           default: 0  |
| tags          | string    |                       |
| notes         | string    |                       |
| parentTask    | integer   | not null, foreign key |
| created_at    | datetime  | not null              |
| updated-at    | datetime  | not null              |

* `parentTask` references `tasks` table

## `user_list`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| userId        | integer   | not null, foreign key |
| listId        | integer   | not null, foreign key |
| editPriv      | boolean   | not null              |

* `userId` references `users` table
* `listId` references `lists` table
