export interface CategoryMenu{
    allsub_category: [{
        id: number,
        category_id: number,
        subCategory_name: string
    }],
    categoryName: string,
    categoryImage: string,
    id: number
}