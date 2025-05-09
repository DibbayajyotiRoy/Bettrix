// import { Router } from 'express';
// import {
//   createMarkets,
//   getLiveMarkets,
//   placeOrder,
//   resolveMarket
// } from './controllers/marketController';
// import { authenticate } from '../../middleware/auth';
// import { validate } from '../../middleware/validation';
// import {
//   createMarketSchema,
//   placeOrderSchema,
//   resolveMarketSchema
// } from './validations/marketSchemas';

// const router = Router();

// // Market Creation
// router.post(
//   '/markets/:matchId',
//   authenticate,
//   validate(createMarketSchema),
//   createMarkets
// );

// // Market Data
// router.get('/markets/live', getLiveMarkets);
// router.get('/markets/:marketId', getMarketDetails);

// // Trading Operations
// router.post(
//   '/orders',
//   authenticate,
//   validate(placeOrderSchema),
//   placeOrder
// );

// // Market Resolution
// router.post(
//   '/markets/:marketId/resolve',
//   authenticate,
//   validate(resolveMarketSchema),
//   resolveMarket
// );

// // Real-time Data Subscription
// router.post('/markets/:marketId/subscribe', authenticate, subscribeToMarket);

// export default router;