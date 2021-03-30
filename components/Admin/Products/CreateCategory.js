import {useState} from 'react';
import axios from 'axios'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {addToProductList} from '../../../slices/productListSlice'
import {addToCategoryList, resetCategoryList} from '../../../slices/categoryListSlice'
//icons
import {MdCancel} from 'react-icons/md'
import UploadImage from './UploadImage'
//spring
import {useSpring, animated} from 'react-spring'



export default function CreateCategory({setViewCategory}) {
    const dispatch = useDispatch()

    //anims
    const extend = useSpring({transform: 'translateX(0px)', from: {transform: 'translateX(-100%)'}});

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState();

    const createCategory = () => {
        const payload = {
            name: name,
            imgUrl: imgUrl
        }
        axios.post('/api/categories/create', payload)
        .then(response => {
            console.log(response.data)
            dispatch(addToCategoryList(response.data));
            dispatch(setViewCategory(null));
        }).catch(error => console.log(error));
    }

    return (
        <animated.div style={extend} className="w-full h-screen fixed top-0 left-0 pt-16 px-4 flex flex-col gap-2 text-gray-800 bg-white">
            <h1 className="text-2xl text-center">Create category</h1>
            <input className="w-full p-2 text-xl bg-gray-100" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />

            <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} phase={'upload'} />
            
            <button  className="w-full p-2 text-2xl text-gray-200 bg-blue-800" onClick={createCategory}>Create</button>

            <MdCancel className="absolute top-4 left-4 text-red-600 text-4xl" onClick={() => setViewCategory(null)} />
        </animated.div>
    )
}