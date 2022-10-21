export default function scrollToNextPage(elem, { offset = 0 }, gap = 0) {
  console.log('check');
  const y =
    elem.getBoundingClientRect().top + window.pageYOffset - offset - gap;

  window.scrollTo({ top: y, behavior: 'smooth' });
}
