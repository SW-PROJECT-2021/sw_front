import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles } from "@material-ui/core";
import Address from "../../commons/address";
import CustomModal from "../../commons/CustomModal";
const useStyles = makeStyles((theme) => ({
   root: {
      margin: "5px",
      padding: "10px",
   },
   button: {
      margin: "6px 0px",
   },
   gobackButton: {
      position: "absolute",
      right: "10px",
   },
   paper: {
      position: "absolute",
      left: "50px",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
   },
}));

export default function AddressForm({ info, setInfo }) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const onChange = (e) => {
      const {
         target: { name, value },
      } = e;
      setInfo((prev) => ({
         ...prev,
         addressInfo: { ...prev.addressInfo, [name]: value },
      }));
   };
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            배송정보
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
               <TextField
                  required
                  id="addressName"
                  name="addressName"
                  label="배송지 이름"
                  value={info.addressName}
                  fullWidth
                  autoComplete="given-name"
               />
            </Grid>
            <Grid item xs={6}>
               <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpen(true)}
                  className={classes.button}>
                  배송지 등록
               </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
               <TextField
                  required
                  id="name"
                  name="name"
                  label="성함"
                  value={info.name}
                  fullWidth
                  autoComplete="given-name"
               />
            </Grid>
            <Grid item xs={6}>
               <TextField
                  required
                  id="zonecode"
                  name="zonecode"
                  value={info.zonecode}
                  label="우편번호"
                  fullWidth
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  id="address"
                  name="address"
                  label="주소"
                  value={info.address}
                  fullWidth
                  required
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="detail"
                  name="detail"
                  value={info.detail}
                  label="상세주소"
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="phone"
                  name="phone"
                  label="연락처"
                  required
                  value={info.phone}
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={12}>
               <TextField
                  id="message"
                  name="message"
                  label="배송 시 메세지"
                  value={info.message}
                  onChange={onChange}
                  fullWidth
               />
            </Grid>
         </Grid>
         <CustomModal open={open} setOpen={setOpen}>
            <Address
               checkout={true}
               setCheckoutInfo={setInfo}
               setOpen={setOpen}
            />
         </CustomModal>
      </React.Fragment>
   );
}
