# Example Redux State

```javascript
{
   users: {
      1: {
         id: 1,
         firstName: "Demo",
         lastName: "Lition",
         username: "Demo",
         email: "demo@aa.io",
         photo: "url/photo.jpg"
      },
        2: {
         id: 2,
         firstName: "Fake",
         lastName: "User",
         username: "FakeUser",
         email: "fake@aa.io",
         photo: "url/photo2.jpg"
      },
      allIds: [1, 2]
   },
   lists: {
      1: {
         id: 1,
         ownerId: 1,
         name: "Chores",
         numTasks: 4,
         numCompleted: 0,
         notes: "Double check milk expiration date",
         taskIds: [1],
         editPrivIds: [2],
         viewPrivIds: []
      },
      2: {
         id: 2,
         ownerId: 2,
         name: "Dog Training",
         numTasks: 5,
         numCompleted: 2,
         notes: "Remember that your friend asked you to care for this dog on his deathbed, so if this doesn't work at least try to find a no kill shelter.",
         taskIds: [2],
         editPrivIds: [],
         viewPrivIds: [2]
      },
      allIds: [1, 2]
   },
   tasks: {
      1: {
         id: 1,
         name: "Kitchen counters",
         completed: false,
         startDate: 2024-10-09 12:00:00,
         dueDate: 2024-10-11 16:00:00,
         priority: 2,
         repeat_type: "after",
         repeat_period: 14,
         location: "The Kitchen",
         estimate: 45,
         tags: "grime, residue, fungus",
         notes: null,
         listId: 1,
         ownerId: 1,
         assignedUser: 2,
         subtaskIds: []
      },
      2: {
         id: 2,
         name: "Research most powerful shock collar",
         completed: false,
         startDate: 2024-11-10 07:00:00,
         dueDate: 2024-12-13 18:00:00,
         priority: 1,
         repeat_type: "non-repeating",
         repeat_period: 0,
         location: "The Internet",
         estimate: 240,
         tags: "justice, obedience, respect",
         notes: "look for reviews from people who have tried on the collars themselves and can provide firsthand pain-level info",
         listId: 2,
         ownerId: 2,
         assignedUser: null,
         subtaskIds: [1]
      },
      allIds: [1, 2]
   },
      subtasks: {
      1: {
         id: 1,
         name: "Shock collar research phase 1",
         completed: false,
         startDate: 2024-11-10 07:00:00,
         dueDate: 2024-11-10 11:00:00,
         priority: 1,
         repeat_type: "non-repeating",
         repeat_period: 0,
         location: "The Internet",
         estimate: 60,
         tags: "justice, obedience, respect",
         notes: "make list of all collars with keywords 'intense' and 'pain' in reviews",
         parentTask: 2,
      },
      allIds: [1]
   },
   session: {
      user: {
         id: 1,
         firstName: "Demo",
         lastName: "Lition",
         username: "Demo",
         email: "demo@aa.io",
         photo: "url/photo.jpg"
      }
   },
   errors: [
         "Unauthorized",
         "Incorrect username/password combination",
         "Cannot edit. You have view-only access to this list."
      ]
}
```
