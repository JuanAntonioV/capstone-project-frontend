import { create } from 'zustand';

const initialState = {
    categories: [],
    products: [],
    selectedCategory: null,
    checkoutProducts: [],
    totalProductPrice: 0,
    totalProductQuantity: 0,
    subTotal: 0,
    total: 0,
};

export const useStore = create((set, get) => ({
    ...initialState,
    setSelectedCategory: (category) => {
        set({
            selectedCategory: category,
            checkoutProducts: [],
            totalProductPrice: 0,
            totalProductQuantity: 0,
            subTotal: 0,
            total: 0,
        });
    },
    setProducts: (products) => set({ products }),
    clearCheckout: () => set(initialState),
    addToCheckout: (product) => {
        // check if product is already in checkout
        const isExist = get().checkoutProducts.find((p) => p.id === product.id);

        let newProduct;

        if (isExist) {
            // if product is already in checkout, increase quantity
            newProduct = get().checkoutProducts.map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p,
                        quantity: p.quantity + 1,
                    };
                }
                return p;
            });
        } else {
            // if product is not in checkout, add it
            newProduct = [
                ...get().checkoutProducts,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        }

        // const isCategorySatuan = get().selectedCategory?.id === 1;

        const totalProductQuantity = newProduct.reduce(
            (acc, curr) => acc + curr.quantity,
            0
        );

        let total = 0;
        let totalProductPrice = 0;

        // if (isCategorySatuan) {
        totalProductPrice = newProduct.reduce(
            (acc, curr) => acc + curr.price * curr.quantity,
            0
        );

        total = totalProductPrice;
        // } else {
        //     totalProductPrice =
        //         totalProductQuantity * get().selectedCategory?.price;

        //     total = totalProductQuantity * get().selectedCategory?.price;
        // }

        set({
            checkoutProducts: newProduct,
            totalProductPrice,
            totalProductQuantity,
            total,
        });
    },
    removeToCheckout: (product) => {
        // check if product is already in checkout
        const isExist = get().checkoutProducts.some((p) => p.id === product.id);

        let newProduct;

        if (isExist) {
            const selected = get().checkoutProducts.find(
                (p) => p.id === product.id
            );
            const countQty = selected.quantity - 1;

            if (countQty === 0) {
                newProduct = get().checkoutProducts.filter(
                    (p) => p.id !== product.id
                );
            } else {
                // if product is already in checkout, decrease quantity
                newProduct = get().checkoutProducts.map((p) => {
                    if (p.id === product.id) {
                        return {
                            ...p,
                            quantity: p.quantity - 1,
                        };
                    }
                    return p;
                });
            }
        }

        // const isCategorySatuan = get().selectedCategory?.id === 1;

        const totalProductQuantity = newProduct.reduce(
            (acc, curr) => acc + curr.quantity,
            0
        );

        let total = 0;
        let totalProductPrice = 0;

        // if (isCategorySatuan) {
        totalProductPrice = newProduct.reduce(
            (acc, curr) => acc + curr.price * curr.quantity,
            0
        );

        total = totalProductPrice;
        // } else {
        //     totalProductPrice =
        //         totalProductQuantity * get().selectedCategory?.price;

        //     total = totalProductQuantity * get().selectedCategory?.price;
        // }

        set({
            checkoutProducts: newProduct,
            totalProductPrice,
            totalProductQuantity,
            total,
        });
    },
    setCategories: (categories) => set({ categories }),
    setTotalProductPrice: (price) => set({ totalProductPrice: price }),
    setTotalProductQuantity: (quantity) =>
        set({ totalProductQuantity: quantity }),
    setSubTotal: (subTotal) => set({ subTotal }),
    setTotal: (total) => set({ total }),
}));
