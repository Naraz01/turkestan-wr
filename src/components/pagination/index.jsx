import React from "react";

export const Pagination = ({currentPage, totalPages, onSelectPage}) => {
    let [pages, setPages] = React.useState([])
    React.useEffect(() => {
        let newPages = [];
        for (let i = 1; i <= totalPages; i++) {
            newPages.push(i)
        }
        setPages(newPages)
    }, [totalPages])
    return (
        <div className='pagination'>
            <ul className="pagination-items">
                {
                    pages && pages.map((item, i) => {
                        return (
                            <li key={i} className = {currentPage === item ? 'pagination-item pagination-item__active' : 'pagination-item'} onClick = {() => onSelectPage(i + 1)}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};