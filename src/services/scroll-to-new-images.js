export default function scrollToNewImages(prevPageHight) {
  window.scrollTo({
    top: prevPageHight - 120,
    left: 0,
    behavior: 'smooth',
  });
}
