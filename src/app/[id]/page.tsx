import Data from '../../../product-fixtures.json';
import ProductDetails from "@/components/Product/productDetails"

export default function Details({params}: {params: {id: string}}) {
    const filtered = Data.filter((item) => item.id === params.id);
    const productDetail = filtered.length > 0 ? filtered[0] : null;

    return (
        <div>
            <ProductDetails id={params.id} details={productDetail}/>
        </div>
    )
}