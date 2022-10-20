export default function scrollToNextPage(elem) {
  const y = elem.getBoundingClientRect().top + window.pageYOffset - 80;

  window.scrollTo({ top: y, behavior: 'smooth' });
}
