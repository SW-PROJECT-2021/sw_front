import React, { useEffect, useState } from "react";
import Table from "./Table";

const list = [
   {
      id: 0,
      src: "assets/images/items/1.jpg",
      name: "Some name of item goes here nice",
      info: "Size: XL, Color: blue",
      quantity: 3,
      price: 30000,
   },
   {
      id: 1,
      src: "assets/images/items/2.jpg",
      name: "Product name goes here nice",
      info: "Size: XL, Color: blue",
      quantity: 1,
      price: 10000,
   },
   {
      id: 2,
      src: "assets/images/items/3.jpg",
      name: " Another name of some product goes just here",
      info: "Size: XL, Color: blue",
      quantity: 2,
      price: 20000,
   },
];

function ShoppingCart() {
   const [cartList, setCartList] = useState([]);

   useEffect(() => {
      setCartList(list);
   }, []);

   return (
      <div>
         <section className="section-pagetop bg">
            <div className="container">
               <h2 className="title-page">장바구니</h2>
            </div>
         </section>

         <section className="section-content padding-y">
            <div className="container">
               <div className="row">
                  <main className="col-md-9">
                     <Table cartList={cartList} setCartList={setCartList} />
                  </main>
                  <aside className="col-md-3">
                     <div className="card mb-3">
                        <div className="card-body">
                           <form>
                              <div className="form-group">
                                 <label>쿠폰 입력</label>
                                 <div className="input-group">
                                    <input
                                       type="text"
                                       className="form-control"
                                       name=""
                                       placeholder="Coupon code"
                                    />
                                    <span className="input-group-append">
                                       <button className="btn btn-primary">
                                          적용
                                       </button>
                                    </span>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                     <div className="card">
                        <div className="card-body">
                           <dl className="dlist-align">
                              <dt>가격 : </dt>
                              <dd className="text-right">USD 568</dd>
                           </dl>
                           <dl className="dlist-align">
                              <dt>할인 :</dt>
                              <dd className="text-right">0</dd>
                           </dl>
                           <dl className="dlist-align">
                              <dt>총 가격:</dt>
                              <dd className="text-right  h5">
                                 <strong>$1,650</strong>
                              </dd>
                           </dl>
                           <hr />
                           <p className="text-center mb-3">
                              <img
                                 src="assets/images/misc/payments.png"
                                 height="26"
                                 alt="error"
                              />
                           </p>
                        </div>
                     </div>
                  </aside>
               </div>
            </div>
         </section>

         <section className="section-name bg padding-y">
            <div className="container">
               <h6>Payment and refund policy</h6>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
               </p>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
               </p>
            </div>
         </section>
      </div>
   );
}
export default ShoppingCart;