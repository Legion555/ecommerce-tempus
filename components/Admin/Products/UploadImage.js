import axios from 'axios';
import { useState } from 'react';
import { storage } from '../../../firebase/firebase'
import 'firebase/storage';
import imageCompression  from "browser-image-compression";
import Image from 'next/image';
//redux
import {useSelector, useDispatch} from 'react-redux'
import { updateUserData } from '../../../slices/userDataSlice';
//icons
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';



export default function UploadImage({imgUrl, setImgUrl, phase}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.value);
  
  const [view, setView] = useState(phase);

  const [imageAsFile, setImageAsFile] = useState(null);

  const [dropStyle, setDropStyle] = useState({borderColor: 'gray'})

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  }

  //Client-Firebase
  const handleFirebaseUpload = e => {
    e.preventDefault();
    
    console.log('start of upload');
    if(imageAsFile === '') {
    return console.error('Not an image');
    }
    imageCompression(imageAsFile, {maxSizeMB: 1, maxWidthOrHeight: 1080})
    .then(compressedFile => {
    setView('uploading');
    //Upload image
    const uploadTask = storage.ref(`/images/${compressedFile.name}`).put(compressedFile)
    uploadTask.on('state_changed',
    (snapShot) => {
        console.log(snapShot)
    }, (err) => {
        console.log(err)
    }, () => {
        storage.ref('images').child(compressedFile.name).getDownloadURL()
        .then(fireBaseUrl => {
        setImgUrl(fireBaseUrl)
        setView('uploaded');
        })
    })
    })
  }
  
  
  //Drag to uplaod
  const dragOver = (e) => {
    e.preventDefault();
    setDropStyle({borderColor: 'blue'})
  }
  const dragEnter = (e) => {
      e.preventDefault();
      setDropStyle({borderColor: 'blue'})
  }
  const dragLeave = (e) => {
      e.preventDefault();
      setDropStyle({borderColor: 'gray'})
  }
  const fileDrop = (e) => {
    e.preventDefault();
    const image = e.dataTransfer.files[0];

      if(image === '') {
        return console.error('Not an image');
      }
      console.log('start of upload');
      imageCompression(image, {maxSizeMB: 0.5, maxWidthOrHeight: 720})
      .then(compressedFile => {
        setView('uploading');
        const uploadTask = storage.ref(`/images/${compressedFile.name}`).put(compressedFile)
        uploadTask.on('state_changed',
        (snapShot) => {
          console.log(snapShot)
        }, (err) => {
          console.log(err)
        }, () => {
          storage.ref('images').child(compressedFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            setImgUrl(fireBaseUrl)
            setView('uploaded');
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  const reset = () => {
    setView('upload');
    setImageAsFile([]);
  }

  return (
    <div className="mb-4 flex justify-center">
      {view === 'upload' &&
      <div className="w-80 p-4 rounded shadow">
        <h1 className="mb-2 text-center text-2xl">Upload image</h1>
        <div className="h-48 p-4 border-2 border-dashed rounded bg-gray-50 mb-2" style={dropStyle}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}>
            <BsCardImage className="text-9xl text-gray-700 mx-auto" />
            <p className="text-center text-gray-700">Drag and drop your image here</p>
        </div>
        <div className="flex gap-4">
          <p className="text-center text-2xl mb-2">or</p>
          <input className="mb-4 text-gray-700 bg-gray-100 rounded" type='file' onChange={handleImageAsFile} />
        </div>
        <button className="w-max mx-auto px-5 py-2 rounded text-gray-200 bg-green-600" onClick={handleFirebaseUpload}>Upload</button>
      </div>
      }
      {view === 'uploading' &&
      <div className="w-80 p-4 rounded shadow">
        <p className="text-center mb-6">Uploading...</p>
        <div className="w-60 h-2 mx-auto rounded bg-gray-200">
            <div className="progbar relative w-8 h-full rounded bg-blue-400"></div>
        </div>
      </div>
      }
      {view === 'uploaded' &&
      <div className="w-full p-4 rounded shadow">
        <h1 className="mb-4 text-xl md:text-2xl"><AiOutlineCheckCircle className="inline text-green-600" /> Uploaded successfully</h1>
        <div className="w-full h-48 md:h-64 mb-4 relative">
            <Image className="object-contain" src={imgUrl ? imgUrl : 'https://via.placeholder.com/250'} layout='fill' />
        </div>
        <p className="w-max mx-auto p-4 rounded-xl text-gray-200 bg-green-800 cursor-pointer"
            onClick={reset}>Upload different image</p>
      </div>
      }
    </div>
  );
}