import {
   Button,
   CircularProgress,
   makeStyles,
   Modal,
   TextField,
   Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changeCountCart, deleteCart } from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles((theme) => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
   quantityInput: {
      width: "40px",
   },
   quantityChange: {
      minWidth: "40px",
      width: "40px",
      marginLeft: "1px",
      padding: "0px",
   },
   productCnt: {
      margin: "5px 0px",
   },
   tableRow: {
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
   },
   soldout: {
      zIndex: 10,
   },
}));

function Table({ cartList, setCartList, highestDelivery }) {
   const history = useHistory();
   const [loading, setLoading] = useState(false);
   const classes = useStyles();
   const dispatch = useDispatch();

   const onChangeQuantity = async (id, count) => {
      setLoading(true);
      dispatch(changeCountCart(parseInt(id), parseInt(count)));
      setLoading(false);
   };

   const onChangeQuantityInput = (e, id, productCnt) => {
      setLoading(true);
      const intCount = parseInt(e.target.value);
      if (intCount === 0) {
         window.alert(
            "0은 첫글자로 입력하실 수 없습니다. 삭제하시려면 삭제버튼을 눌러주세요."
         );
      } else if (intCount > 100) {
         window.alert(
            "배송비 문제로, 한 상품 당 최대 100개까지 구매가능합니다."
         );
      } else if (
         /^[0-9]*$/.test(e.target.value) &&
         (!e.target.value || intCount <= productCnt)
      ) {
         setCartList((prev) =>
            prev.map((item) => {
               if (item.ProductId === id) {
                  return { ...item, count: e.target.value };
               } else {
                  return item;
               }
            })
         );
      }
      setLoading(false);
   };
   const onDelete = async (id) => {
      setLoading(true);
      dispatch(deleteCart(id));
      setLoading(false);
   };

   const onClickCheckout = () => {
      history.push("/checkout", {
         orderProduct: cartList,
         delivery: highestDelivery,
      });
   };
   const getItem = (item, idx) => {
      return (
         <>
            <tr key={idx} className={classes.tableRow}>
               <td>
                  <figure className="itemside">
                     <div className="aside">
                        <img
                           src={item.productImg}
                           className="img-sm"
                           alt="error"
                        />
                     </div>
                     <figcaption className="info">
                        <a href="/" className="title text-dark">
                           {item.productName}
                        </a>
                     </figcaption>
                  </figure>
               </td>
               <td>
                  <TextField
                     id="quantity"
                     label="수량"
                     value={item.count}
                     className={classes.quantityInput}
                     onChange={(e) =>
                        onChangeQuantityInput(
                           e,
                           item.ProductId,
                           item.productCnt
                        )
                     }
                  />
                  <div
                     style={{
                        lineHeight: "46px",
                        width: "40px",
                        float: "right",
                     }}>
                     <Button
                        color="primary"
                        variant="contained"
                        className={classes.quantityChange}
                        onClick={() =>
                           onChangeQuantity(
                              item.ProductId,
                              item.count,
                              item.productCnt
                           )
                        }>
                        변경
                     </Button>
                  </div>
                  <Typography className={classes.productCnt}>
                     재고 : {item.productCnt}
                  </Typography>
               </td>
               <td>
                  <div className="price-wrap">
                     <var className="price">
                        {ThousandSeperator(item.count * item.productPrice)}원
                     </var>
                     <small className="text-muted">
                        {" "}
                        개당 {ThousandSeperator(item.productPrice)}원{" "}
                     </small>
                  </div>
               </td>
               <td className="text-right">
                  <button
                     onClick={() => onDelete(item.ProductId)}
                     className="btn btn-light">
                     {" "}
                     삭제
                  </button>
               </td>
            </tr>
         </>
      );
   };
   return (
      <div className="card">
         {cartList.length === 0 ? (
            <Alert severity="info">아직 장바구니에 넣은 상품이 없습니다!</Alert>
         ) : (
            <table className="table table-borderless table-shopping-cart">
               <thead className="text-muted">
                  <tr className="small text-uppercase">
                     <th scope="col">상품</th>
                     <th scope="col" width="120">
                        수량
                     </th>
                     <th scope="col" width="120">
                        가격
                     </th>
                     <th scope="col" className="text-right" width="100">
                        {" "}
                     </th>
                  </tr>
               </thead>
               <tbody>{cartList.map((item, idx) => getItem(item, idx))}</tbody>
            </table>
         )}
         <div className="card-body border-top">
            <button
               onClick={onClickCheckout}
               className="btn btn-primary float-md-right">
               {" "}
               구매하기 <i className="fa fa-chevron-right"></i>{" "}
            </button>
            <button onClick={() => history.goBack()} className="btn btn-light">
               {" "}
               <i className="fa fa-chevron-left"></i> 뒤로가기{" "}
            </button>
         </div>
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </div>
   );
}
export default Table;
