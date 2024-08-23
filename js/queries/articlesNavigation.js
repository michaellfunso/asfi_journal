function articlesNavigation(totalPagesBooks, currentpages) {
    const pagination_container = document.getElementById("pagination_container");
if(pagination_container){
    let Previous = "";
    let AfterPrevious = "";
    let EndPage = "";
    let TotalPagesCount = "";
    let nextPageContainer = "";
    let OtherPages = "";

    if (totalPagesBooks > 0) {
        if (currentpages > 1) {
            Previous = `<li class="page-item mb-0">
          <a class="page-link" href="?page=${currentpages - 1}" tabindex="-1" id="prevBookPage">
          Previous
          </a>
        </li>`;
        }


        const maxPagesToShow = 5;
        const halfMax = Math.floor(maxPagesToShow / 2);
        const startPage = Math.max(currentpages - halfMax, 1);
        const endPage = Math.min(currentpages + halfMax, totalPagesBooks);
        const nextPage = currentpages + 1;

        if (startPage > 1) {
            AfterPrevious = `<li class="page-item mb-0">
          <a class="page-link" href="?page=1">1</a>
        </li>`;

            if (startPage > 2) {
                AfterPrevious += `<li class="page-item mb-0"><a class="page-link" href="#">..</a></li>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            let active = (i == currentpages ? ' active' : '');
            OtherPages += `<li class="page-item mb-0 ${active}">
          <a class="page-link" href="?page=${i}">${i}</a>
        </li>`;
        }

        if (endPage < totalPagesBooks) {
            if (endPage < totalPagesBooks - 1) {
                EndPage = `<li class="page-item mb-0"><a class="page-link" href="#">..</a></li>`;
            }
            TotalPagesCount = `
        <li class="page-item mb-0"><a class="page-link" href="?page=${totalPagesBooks}">${totalPagesBooks}</a></li>`;
        }

        if (currentpages < totalPagesBooks) {
            nextPageContainer = `<li class="page-item mb-0">
          <a class="page-link" href="?page=${nextPage}" id="nextBookPage">
            Next
          </a>
        </li>`;
        }
    }
 
    pagination_container.innerHTML = `
    <ul class="pagination pagination-primary-soft d-md-flex rounded mb-0"  style="flex-direction:row; display:flex; align-items:center; justify-content:center; width:100%;">
        ${Previous}
        ${AfterPrevious}
        ${OtherPages}
        ${EndPage}
        ${TotalPagesCount}
        ${nextPageContainer}
       </ul>
   <br/>
      <span id="bookPageInfo">Page ${currentpages} of ${totalPagesBooks}</span>`;
}
}
export {
    articlesNavigation
};
