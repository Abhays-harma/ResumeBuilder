"use client"

import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

const useGetDocuments=()=>{
    const queryKey=['documents']
    const query=useQuery({
        queryKey,
        queryFn: async ()=>{
            const response=await client.api.document.all.$get()
            console.log("response from get all doc:",response);
            
            if(!response.ok){
                throw new Error("Failed to get documents")
            }

            const {data,success}=await response.json()
            return {data,success}
        }
    })
    return query
}
export default useGetDocuments;