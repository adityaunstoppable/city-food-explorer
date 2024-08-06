import React, {useEffect, useState} from 'react'

const SearchBar = ({filterResultsFunction , allRes}) => {

  const [searchString , setSearchString] = useState("")

  useEffect(() =>{
    !searchString && filterResultsFunction(allRes)
    const timer = setTimeout(() => {
      if(allRes && searchString){
        const filteredRes = allRes.filter(eachRes => (
            eachRes?.info?.name?.toLowerCase().includes(searchString.toLowerCase()))   
        )
        filterResultsFunction(filteredRes)
  }
    }, 500);

    return ()=>{
      clearTimeout(timer)
    }
  },[searchString])
  

  

  return (
    <div className="m-3 p-3 items-center">
        <input type="search" placeholder="Explore restaurants" onChange={(e) => {setSearchString(e.target.value)}} className="border border-slate-900 rounded-lg focus:border-slate-100 p-2"/>
    </div>
  )
}

export default SearchBar