export interface Product{
        id: string,
        cate_id: number,
        subCate_id: number,
        productName: string,
        brand: string,
        shortDesc: string,
        longDesc: string,
        keywords: string,
        product_status: number,
        deleted_at: number,
        created_at: Date,
        updated_at: Date,
        stars: number,
        reviews: number,
        product_image:any,
        product_tags: [
            {
                product_id: string,
                tag_name: string,
                id: number
            }
        ],
        product_weight: [
            {
                id: number,
                product_id: string,
                weight: number,
                specialPrice: number,
                originalPrice: number,
                discountAmount: number,
                availableStock: number,
                product_coupon: any,
                product_coupons_expiryDate: Date,
                product_sku: any,
                deleted_at: any,
                created_at: any,
                updated_at: any
            }
        ]
}