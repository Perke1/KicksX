import axios from "axios";

export const getLowestAskAndHighestBid = async (product) => {
  let asks = [];
  let bids = [];
  let asksPrices = [];
  let bidsPrices = [];
  if (typeof product === "string") {
    const response = await axios.get(
      `https://kicksxbackend.onrender.com/?name=${product}`
    );
    const productData = response.data[0];

    for (let i = 0; i < productData.asks.length; i++) {
      asks.push(productData.asks[i]);
    }

    for (let i = 0; i < productData.bids.length; i++) {
      bids.push(productData.bids[i]);
    }

    asks.forEach((element) => {
      asksPrices.push(element.price);
    });

    bids.forEach((element) => {
      bidsPrices.push(element.price);
    });

    const lowestAsk = Math.min(...asksPrices);
    const highestBid = Math.max(...bidsPrices);

    return [lowestAsk, highestBid];
  } else {
    for (let i = 0; i < product.asks.length; i++) {
      asks.push(product.asks[i]);
    }

    for (let i = 0; i < product.bids.length; i++) {
      bids.push(product.bids[i]);
    }

    asks.forEach((element) => {
      asksPrices.push(element.price);
    });
    bids.forEach((element) => {
      bidsPrices.push(element.price);
    });
    const lowestAsk = Math.min(...asksPrices);
    const highestBid = Math.max(...bidsPrices);
    return [lowestAsk, highestBid];
  }
};
