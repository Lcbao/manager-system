function GetPageNumbers(pages, totalPages, maxVisible = 5) {
  const pageNumbers = [];
  let start = Math.max(1, pages - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

export default GetPageNumbers;
