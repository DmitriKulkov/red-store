import React, {FC, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import classes from "./ItemPage.module.css";
import {useFetching} from "../../hooks/useFetching";
import ItemsService from "../../API/ItemsService";
import {getPagesCount} from "../../components/utils/pages";
import {initialState} from "../../store/reducers/filterReducers";
import {Product} from "../../entities/product.entity";
import Loader from "../../components/UI/loader/Loader";
import ColorList from "../../components/color-list/ColorList";
import {Sizes} from "../../components/utils/sizes/sizes";
import Select from "../../components/select/Select";
import AddButton from "../../components/add-button/AddButton";
import CardList from "../../components/card-list/CardList";
import {Color} from "../../entities/color.entity";
import {useActions} from "../../hooks/useActions";


const ItemPage:FC = () => {
    const limit = 8
    const {product} = useParams()
    const [sameItems, setSameItems] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [item, setItem] = useState<Product>()
    const [currentImage, setCurrentImage] = useState<string>()
    const [size, setSize] = useState<string>('1')
    const [color, setColor] = useState<Color>()

    const options = [
        {value: 0, name: Sizes.S},
        {value: 1, name: Sizes.M},
        {value: 2, name: Sizes.L}
    ]

    const { addItem } = useActions()

    const {fetching: fetchItems, isLoading: isItemsLoading, error: itemsError} = useFetching(async () => {
        if(product) {
            const resItem = await ItemsService.getBySlug(product)
            setItem(resItem.data)
            setColor(resItem.data.color[0])
            const resSame = await ItemsService.getAllItems(8, 0, {
                ...initialState,
                category: resItem.data.model.category.name
            })
            const totalCount = parseInt(resSame.headers['x-total-count'])
            setSameItems([...sameItems, ...resSame.data])
            setTotalPages(getPagesCount(totalCount, limit))
            setColor(resItem.data.color[0])
        }
    })

    useEffect(()=>{
        fetchItems()
    },[])

    if (item !== undefined && color !== undefined) {
        return (
            <div>
                <div className={classes.item__page}>
                    <div className={classes.item}>
                        <div className={classes.images}>
                            <div className={classes.images__all}>
                                {
                                    item.files.map((file)=>
                                        <img
                                            key={file.id}
                                            src={file.encoded_img}
                                            alt="item"
                                            onClick = {()=>{setCurrentImage(file.encoded_img)}}
                                        />
                                    )
                                }
                            </div>
                            <img src={currentImage === undefined?item.files[0].encoded_img:currentImage} alt="item" className={classes.images__selected}/>
                        </div>
                        <div className={classes.item__about}>
                            <h1>{item.model.name}</h1>
                            <p className={classes.item__text}>Color:</p>
                            <ColorList colors={item.color} onClick={(name)=>{setColor(name as Color)}} fullColor={true}/>
                            <Select
                                value={size}
                                defaultValue="Size"
                                onChange={(e)=> {
                                    setSize(e.target.value)
                                    console.log(size)
                                }}
                                options={options}
                            />
                            <div className={classes.item__price}>
                                <h1>{item.price}</h1>
                                <Link to={"/cart"}>
                                    <AddButton onClick={()=>{addItem({
                                        product: item,
                                        color: color,
                                        size: options[parseInt(size, 10)].name,
                                        quantity: 1 })}}
                                    >
                                        Add to cart
                                    </AddButton>
                                </Link>
                            </div>
                            <p className={classes.item__subtitle}>About:</p>
                            <p className={classes.item__text}>{item.model.description}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={classes.item__same}>
                        <h1 className={classes.item__same__title}>You may also like: </h1>
                        <CardList products={sameItems}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Loader/>
            </div>
        );
    }
};

export default ItemPage;