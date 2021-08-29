import $ from "jquery";
import M from "materialize-css";

export function foo() {
  $(document).ready(function () {
    $("select").formSelect();
  });
}
