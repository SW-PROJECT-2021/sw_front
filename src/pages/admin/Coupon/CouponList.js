import React, { useEffect, useCallback, useState } from "react";
import { useStyles } from "../index";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Title from "../Title";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { Header, UploadButton } from "../ProductManage/ManageStyle";
import { Body } from "../Order/OrderList";
import {
  getCouponAllAction,
  registeCouponByAllAction,
  registeCouponByUserAction,
  registeCouponClear,
} from "../../../stores/actions/couponAction";
import { registeCouponByUser } from "../../../stores/api/couponApi";
import { Copyright } from "../AdminMain";

function CouponList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [couponType, setCouponType] = useState(true);
  const [couponId, setCouponId] = useState(null);
  const [userId, setUserId] = useState(null);
  const { loading, data, error } = useSelector(
    (state) => state.CouponReducer.couponlist
  );
  const registeStateData = useSelector(
    (state) => state.CouponReducer.registecoupon.data
  );
  const registeStateError = useSelector(
    (state) => state.CouponReducer.registecoupon.error
  );
  const onCouponIdHandler = useCallback(
    (e) => {
      setCouponId(e.target.value);
    },
    [couponId]
  );
  const onUserIdHandler = useCallback(
    (e) => {
      setUserId(e.target.value);
    },
    [userId]
  );
  const onCouponTypeHanlder = useCallback(
    (e) => {
      setCouponType(e.target.value);
      console.log(couponType);
    },
    [couponType]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("test");
      if (couponType === true) {
        if (couponId) {
          let data = {
            couponId: couponId,
          };
          dispatch(registeCouponByAllAction(data));
        } else {
          alert("????????? ???????????????");
        }
      } else if (couponType === false) {
        if (couponId && userId) {
          let data = {
            couponId: couponId,
            userLoginId: userId,
          };
          console.log(data);
          dispatch(registeCouponByUserAction(data));
        } else {
          alert("????????? ???????????????");
        }
      }
    },
    [couponId, userId, couponType]
  );
  useEffect(() => {
    dispatch(getCouponAllAction());
  }, []);
  useEffect(() => {
    if (registeStateData) {
      alert("?????? ?????? ??????");
      dispatch(registeCouponClear());
      window.location.reload();
    } else if (registeStateError) {
      alert("?????? ????????? ???????????????.");
      dispatch(registeCouponClear());
      window.location.reload();
    }
  }, [registeStateData, registeStateError]);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return null;
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>?????? ??????</Title>
            <Header>
              <Link to="/admin/Coupon/PostCoupon">
                <UploadButton>?????? ??????</UploadButton>
              </Link>
            </Header>
            <Header>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl style={{ width: "200px" }}>
                  <InputLabel id="demo-simple-select-label">
                    ?????? ??????
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={couponType}
                    onChange={onCouponTypeHanlder}
                  >
                    <MenuItem value={true}>?????? ????????????</MenuItem>
                    <MenuItem value={false}>?????? ?????? ????????????</MenuItem>
                  </Select>
                </FormControl>
                <UploadButton onSubmit={onSubmit}>?????? ??????</UploadButton>
              </div>
              <Form>
                <div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="couponid"
                    label="??????ID??????"
                    name="couponid"
                    type="text"
                    autoComplete="couponid"
                    autoFocus
                    value={couponId}
                    onChange={onCouponIdHandler}
                  />
                </div>
                {couponType === false ? (
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="userId"
                      label="??????ID ??????"
                      name="userId"
                      type="text"
                      autoComplete="userId"
                      autoFocus
                      value={userId}
                      onChange={onUserIdHandler}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </Form>
            </Header>
            <Body>
              <ul className="list-header">
                <li className="list-verysmall">?????? Id</li>
                <li className="list-small">?????? ??????</li>
                <li className="list-small">?????? ??????</li>
                <li className="list-small">?????????</li>
                <li className="list-small">??????????????????</li>
                <li className="list-small">??????????????????</li>
                <li className="list-middle">????????????</li>
              </ul>
              {data.map((item, index) => {
                return (
                  <>
                    <ul className="list-body" key={index}>
                      <li className="list-verysmall">{item.id}</li>
                      <li className="list-small">{item.couponName}</li>
                      <li className="list-small">{item.couponCode}</li>
                      <li className="list-small">{item.discount}</li>
                      <li className="list-small">
                        {item.minimumPrice === null ? (
                          <span>????????????</span>
                        ) : (
                          <span>{item.minimumPrice}</span>
                        )}
                      </li>
                      <li className="list-small">
                        {item.maximumDiscount === null ? (
                          <span>????????????</span>
                        ) : (
                          <span>{item.maximumDiscount}</span>
                        )}
                      </li>
                      <li className="list-middle">
                        {item.isAllCoupon === true ? (
                          <span>?????? ?????? ?????? ??????(????????????)</span>
                        ) : (
                          <span>?????? ???????????? ?????? ??????(%??????)</span>
                        )}
                      </li>
                    </ul>
                  </>
                );
              })}
            </Body>
          </Paper>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}

export default CouponList;
const Form = styled.form`
  div {
    margin-top: 5px;
    display: inline-block;
    width: 300px;
    margin-right: 10px;
  }
  div span {
    width: 100px;
    text-align: center;
    padding-top: 25px;
    margin-right: 10px;
    font-family: NanumSquareRegular;
    font-size: 16px;
  }
  img {
    width: 100%;
    height: 400px;
  }
`;
