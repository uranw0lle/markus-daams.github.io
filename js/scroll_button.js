var scrollToTopBtn = document.querySelector(".top__button");
var rootElement = document.documentElement;

function handleScroll() {

  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.1) {

    scrollToTopBtn.classList.add("showBtn");
  } else {
 
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {

  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

