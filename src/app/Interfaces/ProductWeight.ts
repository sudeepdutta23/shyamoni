export interface ProductWeight{
    [index: number]: {
            id: number,
            product_id: string,
            weight: number,
            specialPrice: number,
            originalPrice: number,
            discountAmount: number,
            availableStock: number,
            product_coupon: any,
            product_coupons_expiryDate: any,
            product_sku: string,
            deleted_at: any,
            created_at: any,
            updated_at: any
    }
}