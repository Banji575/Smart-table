export const strSort = (data, headName)=>{
    return ( data.sort((a,b) => {
      if(a[headName]<b[headName]){
        return -1
      }
      if(a[headName]<b[headName]){
        return 1
      }
      return 0
     
     }))
  }
export const revSort = (data, headName)=>{
    return ( data.sort((a,b) => {
      if(a[headName]>b[headName]){
        return -1
      }
      if(a[headName]>b[headName]){
        return 1
      }
      return 0
     
     }))
  }