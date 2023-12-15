import ProductList from '@/components/ui/ProductList';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ProductPage() {
    return (
        <section>
            <SectionTitle
                title='Semua Produk'
                subtitle='Semua produk yang tersedia'
            />

            <ProductList />
        </section>
    );
}
