import { useState } from 'react'
import { assets} from '../../assets/assets'
import {useAppContext} from '../../context/AppContext'
import toast from 'react-hot-toast';

const AddImages = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding]= useState(false)

  const [image, setImage] = useState(false);
  const [name, setName] = useState('')
  const [isPublished, setIsPublished] = useState(false);


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const img = {
        name, isPublished,image
      }

      const formData = new FormData();
      formData.append('Image', JSON.stringify(img))
      formData.append('image', image)

      const { data } = await axios.post('/api/image/add', formData)
      
      if (data.success) {
        toast.success(data.message)
        setImage('')
        setName('')
        console.log(data)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }

  }


  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Name</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setName(e.target.value)} value={name} />

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)}/>
        </div>

        <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-blue-500 hover:bg-blue-700 text-white rounded-3xl cursor-pointer text-sm'>{isAdding ? 'Adding...' : 'Add image'}</button>

      </div>
    </form>
  )
}

export default AddImages