import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartState: 0,
    subtotal: 0,
    grandTotal: 0,
    coupon: null,
    items: {},
  },
  customer: { phone: null, personal: null, slot: {} },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      state.cart.cartState = state.cart.cartState + 1;
      let items = { ...state.cart.items };

      let { service: cItem, category } = action.payload;

      if (items[cItem.cid] === undefined) {
        items[cItem.cid] = {
          title: category.title,
          image: category.image,
          not_available_dates: category.not_available_dates,
          items: [],
        };
      }
      let serviceTemp = { ...items[cItem.cid] };
      const index = serviceTemp.items.map((i) => i.sid).indexOf(cItem.sid);
      let { cost } = cItem;
      if (index > -1) {
        serviceTemp.items[index].qty = serviceTemp.items[index].qty + 1;
        serviceTemp.items[index].amount = cost * serviceTemp.items[index].qty;
      } else {
        serviceTemp.items.push({ ...cItem, qty: 1, amount: cost });
      }
      state.cart.subtotal = parseInt(state.cart.subtotal) + parseInt(cost);
      state.cart.grandTotal = state.cart.subtotal;
      items[cItem.cid] = serviceTemp;
      state.cart.items = { ...items };

      if (state.cart.coupon) {
        state.cart.coupon = null;
      }
    },
    removeCartState(state, action) {
      let { cid, index } = action.payload;
      let qty = state.cart.items[cid].items[index].qty;
      state.cart.cartState = state.cart.cartState - 1 * qty;
      state.cart.subtotal =
        state.cart.subtotal - state.cart.items[cid].items[index].amount;
      state.cart.grandTotal = state.cart.subtotal;
      if (state.cart.coupon) {
        state.cart.coupon = null;
      }
      state.cart.items[cid].items.splice(index, 1);
      if (state.cart.items[cid].items.length === 0) {
        delete state.cart.items[cid];
      }
    },
    removeCartItem(state, action) {
      state.cart.cartState = state.cart.cartState - 1;
      let { service: cItem } = action.payload;
      let { cost } = cItem;
      let items = { ...state.cart.items };
      let serviceTemp = { ...items[cItem.cid] };
      const index = serviceTemp.items.map((i) => i.sid).indexOf(cItem.sid);
      state.cart.subtotal =
        parseInt(state.cart.subtotal) - parseInt(serviceTemp.items[index].cost);
      state.cart.grandTotal = state.cart.subtotal;
      if (state.cart.coupon) {
        state.cart.coupon = null;
      }
      if (serviceTemp.items[index].qty > 1) {
        serviceTemp.items[index].qty = serviceTemp.items[index].qty - 1;
        serviceTemp.items[index].amount = cost * serviceTemp.items[index].qty;
      } else {
        serviceTemp.items.splice(index, 1);
      }

      if (serviceTemp.items.length > 0) {
        items[cItem.cid] = serviceTemp;
      } else {
        delete items[cItem.cid];
      }

      state.cart.items = { ...items };
    },
    addPhone(state, action) {
      state.customer.phone = action.payload;
    },
    addPersonal(state, action) {
      state.customer.personal = {
        ...action.payload,
      };
    },
    addSlot(state, action) {
      state.customer.slot = Object.assign(state.customer.slot, action.payload);
    },
    clearCart(state) {
      state.cart = { ...initialState.cart };
      state.customer = { ...initialState.customer };
    },

    applyCoupon(state, action) {
      let { code, cid, discount, grand_total_after_discount } =
        action.payload.coupon;
      state.cart.coupon = {
        code: code,
        cid: cid,
        discount: discount,
        subTotal: state.cart.subtotal,
      };
      state.cart.grandTotal = grand_total_after_discount;
    },
    removeCoupon(state, action) {
      state.cart.coupon = null;
      state.cart.grandTotal = state.cart.subtotal;
    },

    clearCustomerDetail(state) {
      state.customer = { ...initialState.customer };
    },
  },
});

export const {
  addCartItem,
  removeCartState,
  removeCartItem,
  addPhone,
  addPersonal,
  addSlot,
  clearCart,
  clearCustomerDetail,
  applyCoupon,
  removeCoupon
} = cartSlice.actions;

export const selectCartState = (state) => state.cart.cart.cartState;
export const cartItems = (state) => state.cart.cart.items;
export const cartCoupon = (state) => state.cart.cart.coupon;
export const cartGrandTotal = (state) => state.cart.cart.grandTotal;
export const cartSubTotal = (state) => state.cart.cart.subtotal;
export const cartData = (state) => state.cart.cart;
export const getCustomerPhone = (state) => state.cart.customer.phone;
export const getCustomerPersonal = (state) => state.cart.customer.personal;
export const getCustomerSlot = (state) => state.cart.customer.slot;
export const getCustomerDetail = (state) => state.cart.customer;
export default cartSlice.reducer;
