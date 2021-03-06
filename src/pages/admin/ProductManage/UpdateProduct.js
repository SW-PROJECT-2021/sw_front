import React, { useCallback, useEffect, useState, useRef } from "react";
import Title from "../Title";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useStyles } from "../index";
import Container from "@material-ui/core/Container";
import {
  CategoryMappingById,
  CategoryList,
  CategoryMapping,
  CategoryMappingByIdPosted,
} from "../../../utils/CategoryMapping";
import {
  UpdateProductId,
  getProductById,
  postProductClear,
} from "../../../stores/actions/productActions";

function ImgPosted({ name, id, deleted }) {
  return (
    <div style={{ width: "200px", display: "flex", alignItems: "center" }}>
      <span style={{ width: "100px", paddingTop: "0" }}>{name}</span>
      <div
        onClick={() => deleted(id)}
        style={{
          backgroundColor: "#fff",
          border: "1px solid black",
          height: "40px",
          width: "50px",
          textAlign: "center",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        삭제
      </div>
    </div>
  );
}

const Body = styled.div`
  width: 100%;
  height: auto;
  .left-block {
    width: 50%;
    height: auto;
    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }
  .info {
    display: inline-block;
    width: 50%;
    height: 50%;
  }
  img {
    width: 100%;
    vertical-align: middle;
    border-style: none;
  }
  p {
    font-size: 1.3rem;
    font-weight: bold;
    font-family: "NanumSquareBold";
    color: rgb(65, 83, 175);
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .line {
    width: 100%;
    height: auto;
    display: flex;
  }
`;
const Form = styled.form`
  div {
    margin-top: 5px;
    display: flex;
    width: 500px;
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

function UpdateProduct({ match }) {
  const classes = useStyles();
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [productImg, setProductImg] = useState({ ImgFile: null });
  const [productDetail, setProductDetail] = useState(null);
  const [postImgs, setpostImgs] = useState([]);
  const [delivery, setDelivery] = useState(null);

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.ProductReducer.productDetail
  );
  const updatedata = useSelector((state) => state.ProductReducer.postproduct);
  const updatedData = updatedata.data;
  const history = useHistory();
  const [category, setCategory] = useState({
    age: "",
    name: "hai",
  });
  useEffect(() => {
    dispatch(getProductById(match.params.id));
  }, []);
  useEffect(() => {
    console.log("test2");
    if (data) {
      setProductName(data.data.name);
      setProductPrice(data.data.price);
      setProductCount(data.data.count);
      setProductImg(data.data.img);
      setProductDetail(data.data.detail);
      setDelivery(data.data.delivery);
      setCategory({
        ...category,
        age: CategoryMappingByIdPosted[data.data.CategoryId],
      });
      console.log(category);
    }
  }, [data]);
  useEffect(() => {
    if (updatedData) {
      alert("상품 수정 성공");
      history.push("/admin/ProductManage");
      dispatch(postProductClear());
    }
  }, [updatedData]);
  const imgId = useRef(0);

  const deleteImg = useCallback((id) => {
    setpostImgs(postImgs.filter((imgs) => imgs.id !== id));
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setCategory({
      ...category,
      [name]: event.target.value,
    });
    console.log(category);
  };
  const onDeliveryHandler = useCallback(
    (e) => {
      setDelivery(e.target.value);
    },
    [delivery]
  );
  const onNameHandler = useCallback(
    (e) => {
      setProductName(e.target.value);
    },
    [productName]
  );
  const onPriceHandler = useCallback(
    (e) => {
      setProductPrice(e.target.value);
    },
    [productPrice]
  );
  const onCountHandler = useCallback(
    (e) => {
      setProductCount(e.target.value);
    },
    [productCount]
  );
  const onImgHandler = useCallback(
    (e) => {
      const img = e.target.files[0];
      const imgData = {
        id: imgId.current,
        img: img,
      };
      setpostImgs(postImgs.concat(imgData));
      imgId.current += 1;
    },
    [productImg, postImgs]
  );
  const onDetailHandler = useCallback(
    (e) => {
      setProductDetail(e.target.value);
    },
    [productDetail]
  );
  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if (
      postImgs.length === 3 &&
      productName &&
      productPrice &&
      productCount &&
      productDetail &&
      category.age &&
      delivery
    ) {
      const formData = new FormData();
      formData.append("id", match.params.id);
      formData.append("imgs", postImgs[0].img);
      formData.append("imgs", postImgs[1].img);
      formData.append("imgs", postImgs[2].img);
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("count", productCount);
      formData.append("detail", productDetail);
      formData.append("category", CategoryMapping[category.age]);
      formData.append("delivery", delivery);

      dispatch(UpdateProductId(formData));
    } else {
      alert("빈칸을 채워주세요!");
    }
  });
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return null;
  return (
    <>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid item className="itemlist">
            <Paper className={classes.paper}>
              <header>
                <Title>제품 수정</Title>
              </header>
              <Divider></Divider>
              <Body>
                <Form onSubmit={onSubmitHandler} id="myForm">
                  <div>
                    <span>상품 번호</span>
                    <span>{data.data.id}</span>
                  </div>
                  <div>
                    <span>상품명</span>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      autoFocus
                      value={productName}
                      onChange={onNameHandler}
                    />
                  </div>
                  <div>
                    <span>상품 가격</span>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="price"
                      name="price"
                      type="number"
                      autoComplete="price"
                      autoFocus
                      value={productPrice}
                      onChange={onPriceHandler}
                    />
                  </div>
                  <div>
                    <span>상품 갯수</span>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="count"
                      name="count"
                      type="number"
                      autoComplete="count"
                      autoFocus
                      value={productCount}
                      onChange={onCountHandler}
                    />
                  </div>
                  <div>
                    <span>상세 설명</span>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      id="detail"
                      placeholder={data.data.detail}
                      name="detail"
                      type="text"
                      autoComplete="count"
                      autoFocus
                      value={productDetail}
                      onChange={onDetailHandler}
                    />
                  </div>
                  <div>
                    <span>배송비</span>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={1}
                      id="배송비"
                      label="배송비"
                      name="배송비"
                      type="number"
                      autoComplete="count"
                      autoFocus
                      value={delivery}
                      onChange={onDeliveryHandler}
                    />
                  </div>
                  <div>
                    <span>카테고리</span>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={category.age}
                        name="age"
                        onChange={handleChange}
                        inputProps={{ "aria-label": "age" }}
                      >
                        <option value="" disabled>
                          {CategoryMappingById[data.data.CategoryId]}
                        </option>
                        {CategoryList.map((list, id) => (
                          <option key={id}>{list}</option>
                        ))}
                      </NativeSelect>
                      <FormHelperText>카테고리를선택하세요</FormHelperText>
                    </FormControl>
                  </div>
                  <div>
                    <span style={{ width: "100px" }}>이미지 등록</span>
                    <span>
                      <input
                        type="file"
                        accept="image/ipg, image/png, image/jpeg, image/gif"
                        name="imgfile"
                        onChange={onImgHandler}
                      />
                    </span>
                  </div>
                  <div style={{ width: "100%", marginBottom: "10px" }}>
                    <span style={{ width: "110px" }}>등록된 이미지</span>
                    {postImgs && true ? (
                      postImgs.map((img) => (
                        <ImgPosted
                          name={img.img.name}
                          id={img.id}
                          deleted={deleteImg}
                        ></ImgPosted>
                      ))
                    ) : (
                      <span>이미지 없음</span>
                    )}
                  </div>
                  <Button id="Submit" type="submit" variant="contained">
                    상품 등록
                  </Button>
                </Form>
              </Body>
            </Paper>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default UpdateProduct;
