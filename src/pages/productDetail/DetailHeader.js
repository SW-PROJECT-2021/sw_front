import { NativeSelect } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

function DetailHeader({ product }) {
   const [quantity, setQuantity] = useState(1);
   const openPopup = () => {
      window.open(
         "/address",
         "shipment",
         "top=10, left=10, width=500, height=600"
      );
   };
   return (
      <article className="card">
         <div className="card-body">
            <div className="row">
               <aside className="col-md-6">
                  <article className="gallery-wrap">
                     <div className="card img-big-wrap">
                        <span>
                           <img
                              src={product.img}
                              alt="error"
                              style={{ maxWidth: "100%" }}
                           />
                        </span>
                     </div>
                  </article>
               </aside>
               <main className="col-md-6">
                  <article>
                     <h3 className="title">{product.name}</h3>
                     <div>
                        <Rating
                           name="read-only"
                           value={5}
                           readOnly
                           className="col-3"
                        />
                        <a href="/" className="btn-link  mr-3 text-muted">
                           {" "}
                           <i className="fa fa-heart"></i> 찜하기{" "}
                        </a>
                     </div>

                     <hr />

                     <div className="mb-3">
                        <h6>Short description</h6>
                        <ul className="list-dots mb-0">
                           <li>Made in Russia</li>
                           <li>Wolf leather </li>
                           <li>Rubber material bottom</li>
                           <li>Dark blue color</li>
                        </ul>
                     </div>
                     <div className="mb-3">
                        <var className="price h4">
                           &#8361;{ThousandSeperator(product.price)}
                        </var>{" "}
                     </div>
                     <div>
                        <span
                           className="col-lg-1"
                           style={{ paddingLeft: "0px" }}
                        >
                           수량 :
                        </span>
                        <NativeSelect
                           onChange={(e) => setQuantity(e.target.value)}
                           value={quantity}
                           className="col-lg-2"
                        >
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                           <option>6</option>
                           <option>7</option>
                           <option>8</option>
                           <option>9</option>
                           <option>10</option>
                        </NativeSelect>
                        &nbsp;
                        <button
                           onClick={openPopup}
                           className="btn btn-outline-secondary  btn-lg col-lg-3"
                        >
                           배송지 선택
                        </button>
                     </div>
                     <br />
                     <div className="mb-6">
                        <button className="btn btn-outline-secondary btn-lg col-lg-3">
                           장바구니
                        </button>
                        &nbsp;
                        <button className="btn btn-outline-secondary btn-lg col-lg-3">
                           구매
                        </button>
                     </div>
                  </article>
               </main>
            </div>
         </div>
      </article>
   );
}
export default DetailHeader;
