// let posts = document.querySelectorAll(".posts");
// let slideIndex = posts.length;
// let movingX, startingX;
// let dragStartX, dragMoveX;

// posts.forEach((post) => {
//   post.addEventListener(
//     "dragstart",
//     (e) => {
//       dragStartX = e.pageX;
//       e.dataTransfer.setDragImage(
//         e.target,
//         window.outerWidth + 800,
//         window.outerHeight + 800
//       );
//     },
//     false
//   );
//   post.addEventListener("drag", (e) => {
//     let save = post.querySelector(".saves");
//     let nope = post.querySelector(".nopes");
//     dragMoveX = e.pageX;

//     if (dragMoveX > dragStartX) {
//       post.style.transform =
//         "translateX(-" +
//         0 +
//         "%) translateY(-" +
//         40 +
//         "%) rotate(" +
//         10 +
//         "deg)";
//       nope.style.visibility = "hidden";
//       save.style.visibility = "visible";
//       save.style.opacity = 1;
//       nope.style.opacity = 0;
//     }
//     if (dragMoveX < dragStartX) {
//       post.style.transform =
//         "translateX(-" +
//         100 +
//         "%) translateY(-" +
//         40 +
//         "%) rotate(-" +
//         10 +
//         "deg)";
//       nope.style.visibility = "visible";
//       nope.style.opacity = 1;
//       save.style.visibility = "hidden";
//       save.style.opacity = 0;
//     }
//   });
//   post.addEventListener("dragend", (e) => {
//     let save = post.querySelector(".saves");
//     let nope = post.querySelector(".nopes");
//     dragMoveX = e.pageX;

//     if (
//       dragStartX < dragMoveX &&
//       dragMoveX - dragStartX > 50 &&
//       slideIndex > 1
//     ) {
//       post.style.transform =
//         "translateX(" + 0 + "%) translateY(" + 100 + "%) rotate(" + 45 + "deg)";
//       post.style.left = 200 + "%";
//       nope.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 1;
//       save.style.visibility = "visible";
//       slideIndex -= 1;
//     }

//     if (
//       dragStartX > dragMoveX &&
//       dragStartX - dragMoveX > 50 &&
//       slideIndex > 1
//     ) {
//       post.style.transform =
//         "translateX(" +
//         0 +
//         "%) translateY(" +
//         100 +
//         "%) rotate(-" +
//         45 +
//         "deg)";
//       post.style.left = "-" + 200 + "%";
//       nope.style.visibility = "visible";
//       nope.style.opacity = 1;
//       save.style.visibility = "hidden";
//       save.style.opacity = 0;
//       slideIndex -= 1;
//     }

//     if (dragMoveX - dragStartX < 100) {
//       post.style.transform =
//         "translateX(-" +
//         50 +
//         "%) translateY(-" +
//         50 +
//         "%) rotate(" +
//         0 +
//         "deg)";
//       nope.style.visibility = "hidden";
//       save.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 0;
//       dragMoveX = undefined;
//     }

//     if (dragStartX - dragMoveX < 100) {
//       post.style.transform =
//         "translateX(-" +
//         50 +
//         "%) translateY(-" +
//         50 +
//         "%) rotate(-" +
//         0 +
//         "deg)";
//       nope.style.visibility = "hidden";
//       save.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 0;
//       dragMoveX = undefined;
//     }
//   });
// });

// posts.forEach((post) => {
//   post.addEventListener("touchstart", (e) => {
//     startingX = e.touches[0].pageX;
//   });

//   post.addEventListener("touchmove", (e) => {
//     let save = post.querySelector(".saves");
//     let nope = post.querySelector(".nopes");
//     movingX = e.touches[0].pageX;

//     if (movingX > startingX) {
//       post.style.transform =
//         "translateX(-" +
//         30 +
//         "%) translateY(-" +
//         40 +
//         "%) rotate(" +
//         10 +
//         "deg)";
//       nope.style.visibility = "hidden";
//       save.style.visibility = "visible";
//       save.style.opacity = 1;
//       nope.style.opacity = 0;
//     }
//     if (movingX < startingX) {
//       post.style.transform =
//         "translateX(-" +
//         80 +
//         "%) translateY(-" +
//         40 +
//         "%) rotate(-" +
//         10 +
//         "deg)";
//       nope.style.visibility = "visible";
//       nope.style.opacity = 1;
//       save.style.visibility = "hidden";
//       save.style.opacity = 0;
//     }
//   });

//   post.addEventListener("touchend", (e) => {
//     let save = post.querySelector(".saves");
//     let nope = post.querySelector(".nopes");

//     if (startingX < movingX && movingX - startingX > 50 && slideIndex > 1) {
//       post.style.transform =
//         "translateX(" + 0 + "%) translateY(-" + 20 + "%) rotate(" + 25 + "deg)";
//       post.style.left = 200 + "%";
//       nope.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 1;
//       save.style.visibility = "visible";
//       slideIndex -= 1;
//     }

//     if (startingX > movingX && startingX - movingX > 50 && slideIndex > 1) {
//       post.style.transform =
//         "translateX(" +
//         0 +
//         "%) translateY(-" +
//         20 +
//         "%) rotate(-" +
//         25 +
//         "deg)";
//       post.style.left = "-" + 200 + "%";
//       nope.style.visibility = "visible";
//       nope.style.opacity = 1;
//       save.style.visibility = "hidden";
//       save.style.opacity = 0;
//       slideIndex -= 1;
//     }

//     if (movingX - startingX < 50) {
//       post.style.transform =
//         "translateX(-" +
//         50 +
//         "%) translateY(-" +
//         50 +
//         "%) rotate(" +
//         0 +
//         "deg)";
//       nope.style.visibility = "hidden";
//       save.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 0;
//       movingX = undefined;
//     }

//     if (startingX - movingX < 50) {
//       post.style.transform =
//         "translateX(-" +
//         50 +
//         "%) translateY(-" +
//         50 +
//         "%) rotate(-" +
//         0 +
//         "deg)";
//       nope.style.visibility = "hidden";
//       save.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 0;
//       movingX = undefined;
//     }
//   });
// });

// let Not = document.querySelector("#not");
// let Interest = document.querySelector("#interest");

// Not.addEventListener("click", () => {
//   notInterested(-1);
// });
// Interest.addEventListener("click", () => {
//   Interested(-1);
// });

// function notInterested(n) {
//   if (slideIndex > 1) carousel((slideIndex += n), "L");
// }
// function Interested(n) {
//   if (slideIndex > 1) carousel((slideIndex += n), "R");
// }

// function carousel(n, direction) {
//   if (n < posts.length && n >= 0) {
//     let save = posts[n].querySelector(".saves");
//     let nope = posts[n].querySelector(".nopes");
//     if (direction === "R") {
//       posts[n].style.transform =
//         "translateX(" + 0 + "%) translateY(" + 100 + "%) rotate(" + 45 + "deg)";
//       posts[n].style.left = 200 + "%";
//       posts[n].style.transitionDelay = 0.5 + "s";
//       nope.style.visibility = "hidden";
//       nope.style.opacity = 0;
//       save.style.opacity = 1;
//       save.style.visibility = "visible";
//     }
//     if (direction === "L") {
//       posts[n].style.transform =
//         "translateX(" +
//         0 +
//         "%) translateY(" +
//         100 +
//         "%) rotate(-" +
//         45 +
//         "deg)";
//       posts[n].style.left = "-" + 200 + "%";
//       posts[n].style.transitionDelay = 0.5 + "s";
//       nope.style.visibility = "visible";
//       nope.style.opacity = 1;
//       save.style.visibility = "hidden";
//       save.style.opacity = 0;
//     }
//   }
// }
