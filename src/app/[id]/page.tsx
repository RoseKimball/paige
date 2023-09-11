import ProductDetails from "@/components/Product/productDetails";

export default function Details({ params }: { params: { id: string } }) {

  return (
    <div>
      <ProductDetails id={params.id}/>
    </div>
  );
}
