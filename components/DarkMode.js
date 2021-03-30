//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateDarkMode} from '../slices/darkModeSlice'
//icons
import {BsSun, BsMoon} from 'react-icons/bs'


export default function DarkMode() {
    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.darkMode.value)

    const toggleDarkMode = () => {
        if (darkMode) {
            return dispatch(updateDarkMode(false));
        }
        return dispatch(updateDarkMode(true));
    }

    return (
        <div className={`w-16 h-8 flex items-center p-1 rounded-full shadow-inner relative cursor-pointer ${darkMode ? 'bg-gray-500' : 'bg-gray-300'}`}
            onClick={() => toggleDarkMode()}>
            <div className={`w-8 text-2xl absolute transform transition-all ease-in duration-150 ${darkMode ? 'translate-x-full' : ''}`}>
                {darkMode ?
                    <BsMoon className="text-gray-800" />
                :
                    <BsSun className="text-yellow-600" />
                }
            </div>
        </div>
    )
}