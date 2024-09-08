import React from 'react'
import axios from 'axios';
import './ReactForm.css'; 
import {useActionState} from 'react'

async function addProduct(previousState,formData) {
    const name = formData.get('name')
    const description = formData.get('description')
    try{

        const result = await axios.post(`http://localhost:5001/products`,{
            name,
            description
        })
        return { error:null,data:'product submitted successfully==='+JSON.stringify(result.data)}
    }catch(error){
        return {...previousState,error:error.message}
    }
    
}
const Actionstatehook = () => {
    const [products,handleSubmit,isPending] = useActionState(addProduct,{
        data:null,
        error:null
    })
  return (
    <div>
      <form action={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input name="name" type="text" required           />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea name="description" required            />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
        <div className='message'>
            {products.data && <p className='success'>{products.data}</p>}
            {products.error && <p className='error'>{products.error}</p>}
        </div>
       
      </form>
    </div>
  )
}

export default Actionstatehook
