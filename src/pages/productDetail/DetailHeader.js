import {
   makeStyles,
   Modal,
   NativeSelect,
   CircularProgress,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Address from "../../commons/address";
import CustomModal from "../../commons/CustomModal";
import { updateCart } from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles(() => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
   inCart: {
      margin: "10px 0px",
      fontSize: "18px",
   },
}));
function DetailHeader({ product, reviews }) {
   const [quantity, setQuantity] = useState(1);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [countInCart, setCountInCart] = useState(0);
   const [mainImage, setMainImage] = useState(product.img1);
   const [defaultAddress, setDefaultAddress] = useState();
   const [refresh, setRefresh] = useState(0);
   const [stars, setStars] = useState(0);

   const classes = useStyles();

   const history = useHistory();
   const userData = useSelector((state) => state.UserReducer.users.data);
   const cartData = useSelector((state) => state.CartReducer);
   const dispatch = useDispatch();

   useEffect(() => {
      for (let v of cartData) {
         if (v.ProductId === product.id) {
            setCountInCart(v.count);
         }
      }
      const getList = async () => {
         await axios.get("/api/dest").then((res) => {
            setDefaultAddress("");
            res.data.data.forEach((item) => {
               if (item.default) {
                  setDefaultAddress(item);
               }
            });
         });
      };
      getList();
   }, [cartData, product.id, refresh]);

   useEffect(() => {
      let sum = 0;
      if (reviews) {
         reviews.forEach((item) => {
            sum += item.star;
         });
         setStars(sum / reviews.length);
      }
   }, [reviews]);

   const onShoppingCart = async () => {
      if (!userData || !userData.userName) {
         alert("????????? ????????? ??????????????? ?????? ??? ????????????.");
      } else {
         setLoading(true);
         if (quantity + countInCart > 100) {
            window.alert(
               "????????? ?????????, ??? ?????? ??? ?????? 100????????? ??????????????? ?????? ??? ????????????."
            );
            setLoading(false);
            return;
         }

         await axios
            .post(`/api/basket`, {
               ProductId: product.id,
               count: quantity,
            })
            .then((res) => {
               console.log(res.data);
               dispatch(updateCart());
            })
            .catch((err) => {
               if (err.response.data.message === "????????? ?????? ??????") {
                  window.alert("????????? ????????? ???????????????!");
               } else if (err.response.data.message === "????????? ??????") {
                  window.alert("???????????????. ?????? ????????? ???????????????.");
               }
            });
         setLoading(false);
      }
   };
   const onClickAddress = (url, name) => {
      if (!userData || !userData.userName) {
         alert("????????? ????????? ???????????? ????????? ??? ????????????.");
      } else {
         setOpen(true);
      }
   };
   const onClickPay = () => {
      if (!userData || !userData.userName) {
         alert("????????? ????????? ???????????? ??? ????????????.");
      } else {
         history.push("/checkout", {
            orderProduct: [
               {
                  ...product,
                  count: quantity,
               },
            ],
            delivery: product.delivery,
         });
      }
   };
   const renderOptions = () => {
      let options = [];
      for (let i = 1; i <= 10; i++) {
         if (i <= product.count) {
            options.push(
               <option key={i} value={i}>
                  {i}
               </option>
            );
         }
      }
      return options;
   };
   return (
      <article className="card">
         <div className="card-body">
            <div className="row">
               <aside className="col-md-6">
                  <article className="gallery-wrap">
                     <div className="card img-big-wrap">
                        <span
                           style={{
                              textAlign: "center",
                           }}>
                           <img
                              src={mainImage}
                              alt="error"
                              style={{ maxWidth: "100%" }}
                           />
                        </span>
                     </div>
                     <div class="thumbs-wrap">
                        <span
                           class="item-thumb"
                           onClick={() => setMainImage(product.img1)}>
                           <img src={product.img1} alt="error" />
                        </span>
                        {product.img2 && (
                           <span
                              class="item-thumb"
                              onClick={() => setMainImage(product.img2)}>
                              {" "}
                              <img src={product.img2} alt="error" />
                           </span>
                        )}
                        {product.img3 && (
                           <span
                              class="item-thumb"
                              onClick={() => setMainImage(product.img3)}>
                              {" "}
                              <img src={product.img3} alt="error" />
                           </span>
                        )}
                     </div>
                  </article>
               </aside>
               <main className="col-md-6">
                  <article>
                     <h3 className="title">{product.name}</h3>
                     <div>
                        <Rating
                           name="read-only"
                           value={stars}
                           readOnly
                           className="col-3"
                        />
                     </div>
                     <hr />
                     <div className="mb-3">
                        <var className="price h4">
                           &#8361;&nbsp;{ThousandSeperator(product.price)}
                        </var>{" "}
                     </div>
                     <br />
                     <div>
                        <span
                           className="col-lg-1"
                           style={{ paddingLeft: "0px" }}>
                           ?????? :
                        </span>
                        <NativeSelect
                           onChange={(e) =>
                              setQuantity(parseInt(e.target.value))
                           }
                           value={quantity}
                           className="col-lg-2">
                           {renderOptions().map((item) => item)}
                        </NativeSelect>
                        &nbsp;
                        <button
                           onClick={() =>
                              onClickAddress("/address", "shipment")
                           }
                           className="btn btn-outline-secondary  btn-lg col-lg-3">
                           ????????? ??????
                        </button>
                     </div>
                     <br />
                     <div className="mb-6">
                        <button
                           className="btn btn-outline-secondary btn-lg col-lg-3"
                           onClick={onShoppingCart}>
                           ????????????
                        </button>
                        &nbsp;
                        <button
                           className="btn btn-outline-secondary btn-lg col-lg-3"
                           onClick={() => onClickPay()}>
                           ??????
                        </button>
                     </div>
                     {countInCart !== 0 && (
                        <div className={classes.inCart}>
                           ?????? ??????????????? ?????? ?????? : {countInCart}
                        </div>
                     )}
                     <br /> <br />
                     <div>
                        {" "}
                        {userData &&
                           userData.userName &&
                           (defaultAddress ? (
                              <>
                                 ?????? ????????? : {defaultAddress.name} <br />
                                 ?????? : {defaultAddress.address}{" "}
                              </>
                           ) : (
                              <>?????? ????????? ?????????????????? ????????????.</>
                           ))}
                     </div>
                  </article>
               </main>
            </div>
         </div>
         <CustomModal open={open} setOpen={setOpen}>
            <Address setRefreshDetail={setRefresh} />
         </CustomModal>

         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </article>
   );
}
export default DetailHeader;
