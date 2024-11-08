import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { axiosInstance } from "./lib/axiosInstance"

export default function App() {
  const fetchAxiosInstance = async () => {
    try {
      const {data} = await axiosInstance.get('/api/v1/demo');
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchAxiosInstance()
  },[])
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
