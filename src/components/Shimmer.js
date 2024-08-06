import React from 'react'

const Shimmer = () => {
  return (<>
  
        <h4 className="mt-2">Made with ❤️ by Aditya</h4>
    <div className="flex flex-wrap justify-center bg-gray-50 mt-20">
        {
            Array(10).fill().map(()=> (
                <div className="w-60 h-60 shadow-lg bg-orange-100 rounded-lg m-3 "></div>
            ))
        }

        
    </div>
    </>
  )
}

export default Shimmer