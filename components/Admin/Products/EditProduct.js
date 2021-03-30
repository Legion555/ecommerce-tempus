import {useState} from 'react';
import axios from 'axios'
//components
import CreateCategory from './CreateCategory'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateProduct} from '../../../slices/productListSlice'
import {updateModal} from '../../../slices/modalSlice'
//icons
import {MdCancel} from 'react-icons/md'
import UploadImage from './UploadImage'
//spring
import {useSpring, animated} from 'react-spring'
//functions
let _ = require('lodash');



export default function EditProduct({product}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList.value)
    const categoryList = useSelector(state => state.categoryList.value)

    const [name, setName] = useState(product ? product.name : null);
    const [price, setPrice] = useState(product ? product.price : null);
    const [description, setDescription] = useState(product ? product.description : null);
    const [category, setCategory] = useState(product ? product.category : null);
    const [imgUrl, setImgUrl] = useState(product ? product.imgUrl : null);

    //view
    const [viewCreateCategory, setViewCategory] = useState(false);

    //anims
    const extend = useSpring({transform: 'translateX(0px)', from: {transform: 'translateX(100%)'}});

    const editProduct = () => {
        const payload = {
            _id: product._id,
            name: name,
            price: parseInt(price, 10),
            measurement: measurement,
            category: category,
            imgUrl: imgUrl
        }
        axios.post('/api/products/edit', payload)
        .then(response => {
            let ind = _.findIndex(productList, {_id: product._id});
            dispatch(updateProduct({product: payload, index: ind}));
            dispatch(updateModal(null));
        }).catch(error => console.log(error));
    }

    return (
        <animated.div style={extend} className="w-full md:w-4/12 min-h-screen fixed z-50 top-0 right-0 pt-4 md:pt-12 px-4 text-gray-800 bg-white">
            <h1 className="mb-4 text-2xl text-center">Edit Product</h1>
            <input className="w-full mb-4 p-2 text-xl bg-gray-100" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full mb-4 p-2 text-xl bg-gray-100" type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <textarea className="w-full mb-4 p-2 text-xl bg-gray-100" type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <div className="mb-4 flex justify-between">
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option  value ="" disabled>Choose a category:</option>
                    {categoryList && categoryList.map(category => 
                        <option key={category._id} value={category.name}>{category.name}</option>
                    )}
                </select>
                <button className="p-2 text-gray-200 bg-green-600" onClick={() => setViewCategory(true)}>Create category</button>
            </div>

            <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} phase={'uploaded'} />
            
            <button  className="w-full p-2 text-2xl text-gray-200 bg-blue-800" onClick={editProduct}>Edit</button>

            <MdCancel className="absolute top-4 left-4 text-red-600 text-4xl" onClick={() => dispatch(updateModal(null))} />

            {viewCreateCategory && <CreateCategory setViewCategory={setViewCategory} />}
        </animated.div>
    )
}