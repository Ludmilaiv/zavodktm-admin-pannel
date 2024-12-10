import classNames from "classnames";

const Pagination = ({ count, page = 1, setPage }) => {
  let deltaPageBegin = 3;
  let deltaPageEnd = 3;
  if (page - deltaPageBegin < 1) {
    deltaPageEnd -= page - deltaPageBegin - 1; 
    deltaPageBegin += page - deltaPageBegin;
  }
  if (page + deltaPageEnd > count - 1) {
    deltaPageBegin += +page + deltaPageEnd - count;
    if (deltaPageBegin <= 0) deltaPageBegin = 0;
    deltaPageEnd -= +page + deltaPageEnd - count - 1;
  }

  return (<>
    <div className="pagination">
      {+page !== 1 ? <>
        <span onClick={() => setPage(1)} className="pagination__item pagination__item_bold">{'<<'}</span>
        <span onClick={() => setPage(page - 1)} className="pagination__item pagination__item_bold">{'<'}</span>
      </> : <>
        <span onClick={() => setPage(1)} className="pagination__item pagination__item_bold pagination__item_disabled">{'<<'}</span>
        <span className="pagination__item pagination__item_bold pagination__item_disabled">{'<'}</span>
      </>}
      {page > 4 && <span className="pagination__points">...</span>}
      {Array(count).fill(null).map((_, i) => {
        return (
          <span key={i + 1} className={classNames("pagination__item", i+1 === +page && 'pagination__item_active', ((i + 1 < page - deltaPageBegin) || (i + 1 > +page + deltaPageEnd)) && 'pagination__item_unvisible')} onClick={() => i+1 !== +page && setPage(i+1)}>
            {i + 1}
          </span>
        )
      })}
      {page <= count - 4 && <span className="pagination__points">...</span>}
      {page !== count ? <>
        <span onClick={() => setPage(page + 1)} className="pagination__item pagination__item_bold">{'>'}</span>
        <span onClick={() => setPage(count)} className="pagination__item pagination__item_bold">{'>>'}</span>
      </> : <>
        <span onClick={() => setPage(page + 1)} className="pagination__item pagination__item_bold pagination__item_disabled">{'>'}</span>
        <span onClick={() => setPage(count)} className="pagination__item pagination__item_bold pagination__item_disabled">{'>>'}</span>
      </>} 
    </div>
    <div className="pagination__label">Страница {page} из {count}</div>
  </>)
}

export default Pagination;