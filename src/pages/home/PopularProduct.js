import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const PopularProduct = () => {
   const [list, setList] = useState([]);
   const history = useHistory();
   useEffect(() => {
      const getList = async () => {
         await axios
            .get(
               `/api/sold/rank/product?startDate=${new Date(
                  0
               )}&endDate=${new Date()}`
            )
            .then((res) => {
               console.log(res.data.data.Product);
               setList(() =>
                  res.data.data
                     .filter(
                        (item) =>
                           !item.Product.isDeleted && item.Product.count !== 0
                     )
                     .slice(0, 4)
               );
            })
            .catch((error) => {
               console.log(error);
            });
      };
      getList();
   }, []);
   const goDetail = (item) => {
      history.push({ pathname: "/detail", state: item });
   };
   return (
      <section className="section-name padding-y-sm">
         <div className="container">
            <header className="section-heading">
               <a
                  href="/list?range=전체보기"
                  className="btn btn-outline-primary float-right">
                  전체보기
               </a>
               <h3 className="section-title">인기 상품</h3>
            </header>

            <div className="row">
               {list.map((item, idx) => {
                  return (
                     <div
                        className="col-md-3"
                        key={idx}
                        onClick={() => goDetail(item.Product)}>
                        <div className="card card-product-grid">
                           <span className="img-wrap">
                              <img src={item.Product.img1} alt="img" />{" "}
                           </span>
                           <figcaption className="info-wrap">
                              {item.Product.name}
                              <div className="price mt-1">
                                 {ThousandSeperator(item.Product.price)}
                              </div>
                           </figcaption>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default PopularProduct;
