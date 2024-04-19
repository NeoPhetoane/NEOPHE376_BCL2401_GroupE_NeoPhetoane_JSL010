document.addEventListener("DOMContentLoaded", () => {
  // 🪲 Bug: Incorrect ID used for attaching the event listener
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books);

        // 🪲 Bug: Incorrect element ID
        document.getElementById(
          "room1Result"
        ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
      });
  });

  document.getElementById("solveRoom2").addEventListener("click", () => {
    const jsConcepts = new Set(["closure", "scope", "hoisting", "async"]);
    // 🪲 Bug: What's mssing from JS concepts?
    const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);

    // 🪲 Bug: Incorrect function call
    const commonConcepts = findIntersection(jsConcepts, reactConcepts);
    document.getElementById(
      "room2Result"
    ).textContent = `The code to unlock the door is: ${Array.from(
      commonConcepts
    ).join(", ")}`;
  });

  // 🪲 Bug: Asynchronous function ? Asynchronous keyword added along with await to allow the promises to be fulfilled first before the async function is excecuted.
  document.getElementById("solveRoom3").addEventListener("click", async () => {
    try {
      const response = await fetch("directions.json");
      const directions = await response.json();
      const message = await navigateLabyrinth(directions);
      // 🪲 Bug: Incorrect method. innerHTML is not utilised, all that needs to be done is display content without any HTML tags. They already exist and are fetched by ID.
      document.getElementById("room3Result").textContent = message;
    } catch (err) {
      console.log(err); //To show in the console if there is an error in the execution of the code.
    }
  });
});

function findMostRecentBook(books) {
  // 🪲 Bug: Logic error //Arrow returned earliest publisheed book instead of latest.
  return books.reduce((mostRecent, book) =>
    new Date(book.published) > new Date(mostRecent.published)
      ? book
      : mostRecent
  );
}

function findIntersection(setA, setB) {
  // 🪲 Bug: Incorrect logic
  return [...setA].filter((element) => setB.has(element)); //Correct logic: what is returned is setA spread out then filtered for similarities with setB, then has check for the presence of A concepts in B.
}

async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    // 🪲 Bug: No delay
    await new Promise((resolve) => setTimeout(resolve, 1000)); //Await added.
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
