export interface Cart{
        id: number,
        product_id: string,
        user_id: number,
        pieces: number,
        orderID: any,
        shyamoni_order_id: any,
        product_weight: {
            id: number,
            weight: number,
            specialPrice: number,
            originalPrice: number,
            discountAmount: number
        },
        status: number,
        deleted_at: any,
        created_at: any,
        updated_at: any,
        ImagePath: string,
        totalStockIn: number,
        totalStockOut: number,
        availableStock: number,
        product: {
            id: string,
            cate_id: number,
            subCate_id: number,
            productName: string,
            brand: string,
            shortDesc: string,
            longDesc: string,
            keywords: string,
            product_status: number,
            deleted_at: any,
            created_at: any,
            updated_at: any
    }
}