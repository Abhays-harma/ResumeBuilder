'use client'

import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

const useGetDocument=(documentId:string)=>{
    const query=useQuery({
        queryKey:['document',documentId],
        queryFn:async ()=>{
            const response= await client.api.document[":documentId"].$get({
                param:{
                    documentId:documentId,
                }
            })

            if(!response.ok){
                throw new Error("Failed to get document");
            }

            const {data,success}=await response.json();
            
            return {
                data,
                success
            }
        },
        retry:3,
    })
    return query;
}

export default useGetDocument;