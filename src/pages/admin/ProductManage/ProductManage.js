import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Title from "../Title";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  UploadButton,
  FilterButton,
  SearchInput,
  SearchButton,
  Header,
  FilterInput,
  FilterText,
} from "./ManageStyle";

import { useDispatch, useSelector } from "react-redux";
import {
  getProductAction,
  OrderProductAction,
  SearchProductAction,
  FilterProductAction,
} from "../../../stores/actions/productActions";
import OrderList from "../../../utils/OrderList";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import { Copyright } from "../AdminMain";
const changeValue = (value) => {
  if (value === "younger") {
    return { orderBy: "updatedAt", cmp: "lower" };
  } else if (value === "older") {
    return { orderBy: "updatedAt", cmp: "greater" };
  } else if (value === "priceHigher") {
    return { orderBy: "price", cmp: "lower" };
  } else if (value === "priveLower") {
    return { orderBy: "price", cmp: "greater" };
  }
};

function ProductManage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.ProductReducer.productlist
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState(null);
  const [filterPirce, setFilterPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const { minPrice, maxPrice } = filterPirce;

  /*전체 상품 조회 */
  useEffect(() => {
    dispatch(getProductAction());
    console.log(data);
  }, []);

  const FilterDataHandler = useCallback(
    (e) => {
      const { value, name } = e.target;
      setFilterPrice({
        ...filterPirce,
        [name]: value,
      });
      console.log(filterPirce);
    },
    [filterPirce]
  );
  const FilterSubmit = () => {
    if (filterPirce) {
      console.log(filterPirce);
      dispatch(FilterProductAction(minPrice, maxPrice));
    } else {
      alert("필터링할 가격을 입력하세요");
    }
  };

  const searchInputHandler = useCallback((e) => {
    setSearchInput(e.target.value);
  });
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value === "dummy") return;
    console.log("test");
    dispatch(OrderProductAction(OrderList(data, changeValue(value))));
  };
  const onSearch = () => {
    if (searchInput) {
      dispatch(SearchProductAction(searchInput));
    } else alert("검색할 값을 입력하세요");
  };
  /*페이지 나누기 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function slicePost(arr) {
    // 배열을 인자로 받아와 분할된 배열로 자른다.
    let currentPosts = 0;
    currentPosts = arr.slice(indexOfFirst, indexOfLast); //slice -> 분할된 배열 리턴
    return currentPosts;
  }

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>서버 에러!</div>;
  if (!data) return null;

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <React.Fragment>
              <Title>상품 관리</Title>
              <Header>
                <Link to="/admin/ProductManage/PostProduct">
                  <UploadButton>제품 등록</UploadButton>
                </Link>
                <FilterText>상품 가격 필터링</FilterText>
                <FilterInput
                  name="minPrice"
                  value={minPrice}
                  onChange={FilterDataHandler}
                />
                <FilterInput
                  name="maxPrice"
                  value={maxPrice}
                  onChange={FilterDataHandler}
                />
                <FilterButton FilterSubmit={FilterSubmit}>Filter</FilterButton>
                <SearchInput
                  placeholder="Search Name"
                  value={searchInput}
                  onChange={searchInputHandler}
                />
                <SearchButton onClick={onSearch}>검색</SearchButton>
                <select
                  onChange={onChange}
                  style={{
                    width: "80px",
                    height: "40px",
                    float: "right",
                  }}
                >
                  <option value="dummy">정렬</option>
                  <option value="younger">최신 순</option>
                  <option value="older">오래된 순</option>
                  <option value="priceHigher">가격 높은 순</option>
                  <option value="priveLower">가격 낮은 순</option>
                </select>
              </Header>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">등록번호</TableCell>
                    <TableCell align="left">카테고리 분류</TableCell>
                    <TableCell align="left">이름</TableCell>
                    <TableCell align="right">옵션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* 목록구현  */}
                  <ProductList posts={slicePost(data)} />
                </TableBody>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPost={data.length}
                  setCurrentPage={setCurrentPage}
                />
              </Table>
            </React.Fragment>
          </Paper>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}

export default ProductManage;
