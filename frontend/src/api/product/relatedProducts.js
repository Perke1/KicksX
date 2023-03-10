import { useQuery } from "react-query";
import axios from "axios";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";

const BASE_URL = "https://kicksxbackend.onrender.com/";

export const useGetRelatedProducts = (originalProductName, combinedFilter) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["relatedProducts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      const data = response.data;

      const result = await Promise.all(
        data
          .filter(
            (product) =>
              product.name.includes(combinedFilter) &&
              product.name !== originalProductName
          )
          .map(async (relatedProduct) => {
            const { id, name, thumbnail } = relatedProduct;
            const data = await getLowestAskAndHighestBid(relatedProduct);

            let lowestAsk = data[0];
            return { id, name, thumbnail, lowestAsk };
          })
      );
      return result;
    },
  });
  return { isLoading, data };
};
