import M from "materialize-css";

alert("I am connected");

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".materialboxed");
  let option = { outDuration: 2000 };

  let instances = M.Materialbox.init(elems, option);
});
