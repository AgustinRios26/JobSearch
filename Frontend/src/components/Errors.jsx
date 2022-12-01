import React from 'react'

export default function Errors({errors}) {
  return (
    <>
    {console.log(errors)}
        {
            errors.isErrors&&
            <div >
                <ul>
                    {errors.errors.map((error,index)=>
                        <li className='bg-red-300 text-red-900 w-1/2 mx-auto mt-1 p-4 w-full my-5' key={index}>{error}</li>
                    )}
                </ul>
            </div>
        }
    </>
  )
}