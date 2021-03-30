import {useState} from 'react';
import axios from 'axios'
//components
import CreateCategory from './CreateCategory'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {addToProductList} from '../../../slices/productListSlice'
import {updateModal} from '../../../slices/modalSlice'
//icons
import {MdCancel} from 'react-icons/md'
import UploadImage from './UploadImage'
//spring
import {useSpring, animated} from 'react-spring'



export default function AddProduct() {
    const dispatch = useDispatch()
    const categoryList = useSelector(state => state.categoryList.value)

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imgUrl, setImgUrl] = useState();

    //view
    const [viewCreateCategory, setViewCategory] = useState(false);

    //anims
    const extend = useSpring({transform: 'translateX(0px)', from: {transform: 'translateX(-100%)'}});

    const addProduct = () => {
        const payload = {
            name: name,
            price: parseInt(price, 10),
            description: description,
            category: category,
            imgUrl: imgUrl
        }
        axios.post('/api/products/create', payload)
        .then(response => {
            dispatch(addToProductList(response.data));
            dispatch(updateModal(null));
        }).catch(error => console.log(error));
    }

    return (
        <animated.div style={extend} className="w-full md:w-6/12 lg:w-4/12 h-screen fixed z-50 top-0 left-0 pt-4 md:pt-12 px-4 text-gray-800 bg-white">
            <h1 className="mb-4 text-2xl text-center">Add Product</h1>
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
            
            <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} phase={'upload'} />
            
            <button  className="w-full p-2 text-2xl text-gray-200 bg-blue-800" onClick={addProduct}>Add</button>

            <MdCancel className="absolute top-4 left-4 text-red-600 text-4xl" onClick={() => dispatch(updateModal(null))} />

            {viewCreateCategory && <CreateCategory setViewCategory={setViewCategory} />}
        </animated.div>
    )
}