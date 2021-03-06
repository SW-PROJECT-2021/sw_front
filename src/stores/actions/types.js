//user action
export const LOGINED = "LOGINED";
export const LOGINED_SUCCESS = "LOGINED_SUCCESS";
export const LOGINED_ERROR = "LOGINED_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGNUP_CLEAR = "SIGNUP_CLEAR";
//관리자 체크
export const ADMIN_CHECK = "ADMIN_CHECK";
export const ADMIN_CHECK_SUCCESS = "ADMIN_CHECK_SCUEESSS";
export const ADMIN_CHECK_ERROR = "ADMIN_CHECK_ERROR";
export const ADMIN_CHECK_CLEAR = "ADMIN_CHECK_CLEAR";
//product action
//제품전체
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";
//제품1개조회
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";
//상품 등록
export const POST_PRODUCT = "POST_PRODUCT";
export const POST_PRODUCT_SUCCESS = "POST_PRODUCT_SUCCESS";
export const POST_PRODUCT_ERROR = "POST_PRODUCT_ERROR";
export const POST_PRODUCT_CLEAR = "POST_PRODUCT_CLEAR";
//상품 수정
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_ERROR = "UPDATE_PRODUCT_ERROR";
//상품 필터
export const FILTER_PRODUCT = "FILTER_PRODUCT";
export const FILTER_PRODUCT_SUCCESS = "FILTER_PRODUCT_SUCCESS";
export const FILTER_PRODUCT_ERROR = "FILTER_PRODUCT_ERROR";
//카트
export const UPDATECART = "UPDATECART";
export const DELETECART = "DELETECART";
export const CHANGE_COUNT_CART = "CHANGE_COUNT_CART";
//admin 상품 정렬
export const ORDER_PRODUCT = "ORDER_PRODUCT";
//admin Search
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS";
export const SEARCH_PRODUCT_ERROR = "SEARCH_PRODUCT_ERROR";

//배너 전체 조회
export const GET_BANNERS = "GET_BANNERS";
export const GET_BANNERS_SUCCESS = "GET_BANNERS_SUCCESS";
export const GET_BANNERS_ERROR = "GET_BANNERS_ERROR";
//배너 1개 조회
export const GET_BANNER = "GET_BANNER";
export const GET_BANNER_SUCCESS = "GET_BANNER_SUCCESS";
export const GET_BANNER_ERROR = "GET_BANNER_ERROR";
//배너 등록
export const POST_BANNER = "POST_BANNER";
export const POST_BANNER_SUCCESS = "POST_BANNER_SUCCESS";
export const POST_BANNER_ERROR = "POST_BANNER_ERROR";
export const POST_BANNER_CLEAR = "POST_BANNER_CLEAR";
//배너 정렬
export const SORT_BANNER = "SORT_BANNER";
export const SORT_BANNER_SUCCESS = "SORT_BANNER_SUCCESS";
export const SORT_BANNER_ERROR = "SORT_BANNER_ERROR";
//배너 검색
export const SEARCH_BANNER = "SEARCH_BANNER";
export const SEARCH_BANNER_SUCCESS = "SEARCH_BANNER_SUCCESS";
export const SEARCH_BANNER_ERROR = "SEARCH_BANNER_ERROR";
//배너 수정
export const UPDATE_BANNER = "UPDATE_BANNER";
export const UPDATE_BANNER_SUCCESS = "UPDATE_BANNER_SUCCESS";
export const UPDATE_BANNER_ERROR = "UPDATE_BANNER_ERROR";

export const DETAIL_BANNER_CLEAR = "DETAIL_BANNER_CLEAR";

//주문 조회 전체
export const GET_ORDER_ALL = "GET_ORDER_ALL";
export const GET_ORDER_ALL_SUCCESS = "GET_ORDER_ALL_SUCCESS";
export const GET_ORDER_ALL_ERROR = "GET_ORDER_ALL_ERROR";
//주문내역 필터 (어드민)
export const FILTER_ORDER_ALL = "FILTER_ORDER_ALL";
export const FILTER_ORDER_ALL_SUCCESS = "FILTER_ORDER_ALL_SUCCESS";
export const FILTER_ORDER_ALL_ERROR = "FILTER_ORDER_ALL_ERROR";
//주문 내역 상태 수정
export const PUT_ORDER_STATE = "PUT_ORDER_STATE";
export const PUT_ORDER_STATE_SUCCESS = "PUT_ORDER_STATE_SUCCESS";
export const PUT_ORDER_STATE_ERROR = "PUT_ORDER_STATE_ERROR";
//주문-> 상품평
export const GET_ORDER_REVIEWS = "GET_ORDER_REVIEWS";
export const GET_ORDER_REVIEWS_SUCCESS = "GET_ORDER_REVIEWS_SUCCESS";
export const GET_ORDER_REVIEWS_ERROR = "GET_ORDER_REVIEWS_ERROR";

//통계-판매금액 조회
export const GET_SALED_ALL = "GET_SALED_ALL";
export const GET_SALED_ALL_SUCCESS = "GET_SALED_ALL_SUCCESS";
export const GET_SALED_ALL_ERROR = "GET_SALED_ALL_ERROR";
//통계-판매금액 기간별 조회
export const GET_SALED_DATE = "GET_SALED_DATE";
export const GET_SALED_DATE_SUCCESS = "GET_SALED_DATE_SUCCESS";
export const GET_SALED_DATE_ERROR = "GET_SALED_DATE_ERROR";
//통계-판매 상품 조회 기간별
export const GET_RANK_PRODUCT = "GET_RANK_PRODUCT";
export const GET_RANK_PRODUCT_SUCCESS = "GET_RANK_PRODUCT_SUCCESS";
export const GET_RANK_PRODUCT_ERROR = "GET_RANK_PRODUCT_ERROR";
//통계-판매 카테고리 조회 기간별
export const GET_RANK_CATEGORY = "GET_RANK_CATEGORY";
export const GET_RANK_CATEGORY_SUCCESS = "GET_RANK_CATEGORY_SUCCESS";
export const GET_RANK_CATEGORY_ERROR = "GET_RANK_CATEGORY_ERROR";

//쿠폰 전체 조회
export const GET_COUPON_ALL = "GET_COUPON_ALL";
export const GET_COUPON_ALL_SUCCESS = "GET_COUPON_ALL_SUCCESS";
export const GET_COUPON_ALL_ERROR = "GET_COUPON_ALL_ERROR";
//쿠폰 1개-> 보유 유저 조회
export const GET_COUPON_USER = "GET_COUPON_USER";
export const GET_COUPON_USER_SUCCESS = "GET_COUPON_USER_SUCCESS";
export const GET_COUPON_USER_ERROR = "GET_COUPON_USER_ERROR";
//쿠폰 생성
export const POST_COUPON = "POST_COUPON";
export const POST_COUPON_SUCCESS = "POST_COUPON_SUCCESS";
export const POST_COUPON_ERROR = "POST_COUPON_ERROR";
//쿠폰 등록 전체
export const POST_COUPONREGISTE_ALL = "POST_COUPONREGISTE_ALL";
export const POST_COUPONREGISTE_ALL_SUCCESS = "POST_COUPONREGISTE_ALL_SUCCESS";
export const POST_COUPONREGISTE_ALL_ERROR = "POST_COUPONREGISTE_ALL_ERROR";
//쿠폰 등록 ->유저
export const POST_COUPONREGISTE_USER = "POST_COUPONREGISTE_USER";
export const POST_COUPONREGISTE_USER_SUCCESS =
  "POST_COUPONREGISTE_USER_SUCCESS";
export const POST_COUPONREGISTE_USER_ERROR = "POST_COUPONREGISTE_USER_ERROR";
export const CLEAR_COUPONDATA = "CLEAR_COUPONDATA";
export const CLEAR_COUPON_REGISTE = "CLEAR_COUPON_REGISTE";
//문의 내역 전체 조회
export const GET_QUESTION_ALL = "GET_QUESTION_ALL";
export const GET_QUESTION_ALL_SUCCESS = "GET_QUESTION_ALL_SUCCESS";
export const GET_QUESTION_ALL_ERROR = "GET_QUESTION_ALL_ERROR";
//문의 내역 상세 조희
export const GET_QUESTION_DETAIL = "GET_QUESTION_DETAIL";
export const GET_QUESTION_DETAIL_SUCCESS = "GET_QUESTION_DETAIL_SUCCESS";
export const GET_QUESTION_DETAIL_ERROR = "GET_QUESTION_DETAIL_ERROR";
//문의 답변하기
export const POST_ANSWER = "POST_ANSWER";
export const POST_ANSWER_SUCCESS = "POST_ANSWER_SUCCESS";
export const POST_ANSWER_ERROR = "POST_ANSWER_ERROR";
export const POST_ANSWER_CLEAR = "POST_ANSWER_CLEAR";
