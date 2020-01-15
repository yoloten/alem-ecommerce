import { Connection } from "typeorm"

export async function filterMany(arrFromReq: string[], Model: any, connection: Connection, Product: any, type: string): Promise<any[]> {
    const items: any = arrFromReq ? await connection
        .getRepository(Model)
        .find({
            where: arrFromReq.map((item: string) => {
                return { name: item }
            })
        }) : []

    let i = 0
    let temp = []
    let results: number[] = []
    
    if (items.length > 0) {

        switch (type) {
            case "color":
                while (i < items.length) {
                    temp.push(await connection.query(`select "productPrimaryKey" from product_colors_color where "colorId" = $1`, [items[i].id]))
                    i++
                }
            case "size":
                while (i < items.length) {
                    temp.push(await connection.query(`select "productPrimaryKey" from product_sizes_size where "sizeId" = $1`, [items[i].id]))
                    i++
                }
            case "material":
                while (i < items.length) {
                    temp.push(await connection.query(`select "productPrimaryKey" from product_materials_material where "materialId" = $1`, [items[i].id]))
                    i++
                }
            case "category":
                while (i < items.length) {
                    temp.push(await connection.query(`select "productPrimaryKey" from product_categories_category where "categoryId" = $1`, [items[i].id]))
                    i++
                }
            default:
                break
        }

        const flat = temp.flat().map((item) => item.productPrimaryKey).sort((a, b) => a - b)
        // console.log(flat)
        if (type === "category") {
            results = flat
        } else {
            for (let index = 0; index < flat.length - 1; index++) {
                if (flat[index] === flat[index + 1]) {
                    results.push(flat[index])
                }
            }
        }
       
    } else {
        results = []
    }
    
    return results
}
