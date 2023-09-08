import Data from '../../../public/product-fixtures.json';
import ProductDetails from "@/components/Product/productDetails"
import { Products } from '@/Interfaces/types';

export default function Details({params}: any) {
    // get data from json file/DB based on ID 
    // pass it to ProductDetails component

    const filtered = Data.filter((item) => item.id === params.id);
    const productDetail = filtered.length > 0 ? filtered[0] : null;


    return (
        <div>
            <ProductDetails id={params.id} details={productDetail}/>
        </div>
    )
}