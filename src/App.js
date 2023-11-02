import './App.css';
import JsonData from './products.json'
import React, {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';

let cat = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting']

function App() {
    let data = JsonData.products

    const [selectedSort, setSort] = useState('');
    const [selectedFilter, setFilter] = useState('')

    const handleSort = (event) => {
        setSort(event.target.value)
    }
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    if(selectedFilter !== ''){
        data = data.filter((item) => item.category === selectedFilter)
    }

    if(selectedSort === 'descending') {
         data = data.slice().sort((a, b) => b.price - a.price)
     }
    else if(selectedSort === 'ascending') {
         data = data.slice().sort((a, b) => a.price - b.price)
     }

    const [page, setPage] = useState(0)
    const n = 10
    const [filterData, setFilterData] = useState()

    useEffect(() => {
        setFilterData(
            data.filter((item, index) => {
            return (index >= page * n) & (index < (page + 1) * n)
        }))
    }, [data, page]);

    return (
        <>
            <div className={'Sorter-Filter'}>
                { <select value={selectedSort} onChange={handleSort} className={'SortFilt'}>
                    <option value={''}>---------Sort---------</option>
                    <option value={'ascending'}>Price Low to High</option>
                    <option value={'descending'}>Price High to Low</option>
                  </select>}
                  <select value={selectedFilter} className={'SortFilt'} onChange={handleFilter}>
                    <option value={''}>---------Filter---------</option>
                    {(cat.map((cats) => {return <option value={`${cats}`}>{cats}</option>}))}
                  </select>
            </div>
            <div className={'Home'}>
                {filterData && filterData.map((item) => (<div className={'ProductCardBg'}> <div className={'ProductCard'}>
                <img src={item.thumbnail} className={'ProductThumbNail'} alt={'Product Thumb Nail'}/>
                <div className={'ProductInfo'}>
                    <p className={'ProductTitle'}>{item.title}</p>
                    <p className={'ProductDescription'}>{item.description}</p>

                </div>
                     <div className={'ProductPrice'}>
                        <p>${item.price}</p>
                    </div>
                </div></div>))}
            </div>

            <ReactPaginate containerClassName={"pagination"} pageClassName={"page-item"} activeClassName={"active"} onPageChange={(event) => setPage(event.selected)} pageCount={Math.ceil(data.length / n)} breakLabel="..."
            previousLabel={
               '< prev'
             }
            nextLabel={
                'next >'
            }
            />
        </>
    );
}

export default App;
