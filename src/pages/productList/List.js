import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import CustomPagination from "../../commons/CustomPagination";
import OrderList from "../../utils/OrderList";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const changeValue = (value) => {
   if (value === "younger") {
      return { orderBy: "updatedAt", cmp: "lower" };
   } else if (value === "older") {
      return { orderBy: "updatedAt", cmp: "greater" };
   } else if (value === "priceHigher") {
      return { orderBy: "price", cmp: "lower" };
   } else if (value === "priveLower") {
      return { orderBy: "price", cmp: "greater" };
   } else if (value === "name") {
      return { orderBy: "name", cmp: "greater" };
   } else if (value === "reverseName") {
      return { orderBy: "name", cmp: "lower" };
   }
};

function List({ list, setList }) {
   const pageNum = Math.floor(list.length / 12 + 1);
   const [page, setPage] = useState(1);
   const history = useHistory();
   const onChange = (e) => {
      const {
         target: { value },
      } = e;
      if (value === "dummy") return;
      setList((prev) => OrderList(prev, changeValue(value)));
   };
   const goDetail = (item) => {
      history.push({ pathname: "/detail", state: item });
   };
   return (
      <main className="col-md-12">
         <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
               <span className="mr-md-auto">
                  {list.length} 항목이 있습니다.
               </span>
               <select onChange={onChange} className="mr-2 form-control">
                  <option value="dummy">정렬</option>
                  <option value="younger">최신 순</option>
                  <option value="older">오래된 순</option>
                  <option value="priceHigher">가격 높은 순</option>
                  <option value="priveLower">가격 낮은 순</option>
                  <option value="name">이름순</option>
                  <option value="reverseName">이름 역순</option>
               </select>
            </div>
         </header>
         <div className="row">
            {list.slice((page - 1) * 12, page * 12).map((item, idx) => {
               return (
                  <div
                     key={idx}
                     className="col-md-3"
                     onClick={() => goDetail(item)}>
                     <figure className="card card-product-grid">
                        <div className="img-wrap">
                           <img src={item.img1} alt="error" />
                        </div>
                        <figcaption className="info-wrap">
                           <div className="fix-height">
                              {item.name}
                              <div className="price-wrap mt-2">
                                 <span className="price">
                                    {ThousandSeperator(item.price)}
                                 </span>
                              </div>
                           </div>
                        </figcaption>
                     </figure>
                  </div>
               );
            })}
         </div>
         <CustomPagination
            onChangePage={(e, page) => setPage(page)}
            pageNum={pageNum}
         />
      </main>
   );
}
export default List;

/*할인 된 거 일때

가격 밑에 이거 추가

   <del className="price-old">$1980</del>


   
   새로운 아이템일 경우  
    <div className="img-wrap"> 밑에

   <span className="badge badge-danger"> NEW </span>
   이거 추가
*/
