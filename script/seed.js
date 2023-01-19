"use strict";

const {
  db,
  models: { User, Todo },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    await User.create({ username: "Sean", password: "123" }),
    await User.create({ username: "murphy", password: "123" }),
  ]);

  const todos = await Promise.all([
    await Todo.create({ userId: 1, desc: "a todo item", completed: false }),
    await Todo.create({ userId: 1, desc: "make dinner", completed: false }),
    await Todo.create({ userId: 1, desc: "let dogs out", completed: false }),
    await Todo.create({
      userId: 1,
      desc: "finish todo list app",
      completed: false,
    }),
    await Todo.create({ userId: 1, desc: "play with sam", completed: false }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${todos.length} todos`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
